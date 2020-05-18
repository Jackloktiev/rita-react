import React, { useState, useEffect } from 'react';
import "./Layout.css";
import Sidebar from "../sidebar/Sidebar";
import Gallery from "../gallery/Gallery";
import Upload from "../Upload/Upload";
import { BrowserRouter, Route, Switch } from "react-router-dom";



function Layout() {
    const [data, setData] = useState(); // array of pictures from the server
    const [category, setCategory] = useState(); // array of pictures from the server
    const [filteredData, setFilteredData] = useState();
    
    //filters pictures depending on category clicked
    let clickHandler = (item)=>{
        let filteredArray = data.filter(picture=>picture.category===item);
        setFilteredData(filteredArray);
    }
    // filters pictures to show all of them. i.e no category selected
    let allClickHandler = ()=>{
        setFilteredData(data);
    }
    // Fetch pictures from the server
    useEffect(() => {
        // food items
        fetch("/images.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => { return response.json() })
        .then((result) => {
            let arr=[];
            let imgObject;
            for(const item in result) {
                imgObject = {
                    id:item,
                    category:result[item].category,
                    description:result[item].description,
                    title:result[item].title,
                    url:result[item].url
                };
                arr.push(imgObject);
            }
            //get set of unique categories
            let category=[];
            let unique = [];
            if(arr){
                arr.map(item=>{
                    return category.push(item.category);
                });
                unique = [...new Set(category)];
                setCategory(unique);
            }
            setData(arr);
            setFilteredData(arr);
        })

    }, []);


  return (
    <div className="main">
        <BrowserRouter>
            <Sidebar categories = {category} click={clickHandler} clickAll = {allClickHandler} />
            <Switch>
                <Route path="/" exact render={()=><Gallery pictures = {filteredData} />} />
                <Route path="/ritawantstoaddpicture" component={Upload} />
            </Switch>
        
        </BrowserRouter>
    </div>
  );
}

export default Layout;