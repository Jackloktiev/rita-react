import React, {useContext, useState} from 'react';
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {AuthContext} from "../Context";
import CategoryItem from "./CategoryItem";



function Sidebar(props) {
  const authContext = useContext(AuthContext);
  const [show, setShow] = useState(false); // indicates whether to show all side bar in mobile view or just Rita's name
  
  //Show pictures from all categories
  let clickAll = ()=>{
    props.clickAll();
  }

  //In mobile view shows the rest of the sidebar upon click on arrow
  let sideCLickHandler = ()=>{
    setShow(!show);
  }

  // displays a key sign - a link to upload page - when user is signed in
  let display;
  if(authContext.isAuth==="true"){
    display=(<NavLink to="/ritawantstoaddpicture">
      <img src="icons/key.png" alt="Key icon" className="sidebar__key"/>
    </NavLink>)
    
  }else{
    display = null
  }

  // displays the list of categories - forms the list dinamically from all pictures got from the server
  let categoriesSet;
  if(props.categories){
    categoriesSet = (
      <ul className="sidebar__list">
          {props.categories.map(category => {
            return <CategoryItem value = {category} click = {props.click} key={category} />
          })}
      </ul>
    )
    
  }else{
    categoriesSet=null;
  }

  // depending on "show" state assigns classes to the rest of the side bar to whether show or hide them upon click on the arrow
  let sidebarNav;
  let sideSocial;
  if(show){
    sidebarNav="sidebar__nav--show";
    sideSocial = "sidebar__social-media--show";
  }else{
    sidebarNav="sidebar__nav";
    sideSocial = "sidebar__social-media";
  }

  return (
    <div className="sidebar">

      <NavLink to="/" className="sidebar__name">Margarita Illina</NavLink>

      <div className = "arrow" onClick = {sideCLickHandler}>&#11167;</div>

      <div className={sidebarNav}>
            <div className="sidebar__illustration">
                <h3 className="sidebar__illustration-text" onClick={clickAll} >Illustration</h3>
            </div>
            
            {categoriesSet}
            <h3 className="sidebar__about">About</h3>

            {display}
        </div>

        <div className={sideSocial}>
            <img src="icons/vk.png" alt="Vkontakte icon" className="sidebar__social-media__icon"/>
            <img src="icons/instagram2.png" alt="Instagram icon" className="sidebar__social-media__icon"/>
        </div>

    </div>
  );
}

export default Sidebar;