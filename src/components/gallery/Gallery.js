import React, {useState} from 'react';
import "./Gallery.css";
import GalleryItem from "./GalleryItem";
import firebase from 'firebase';


function Gallery(props) {

  const [popup, setPopup] = useState(false); // show or hide modal
  const [id, setId] = useState(false); //id of the picture to be shown in a modal

  //delete functionality
  const deleteClickHandler = (id)=>{
    firebase.database().ref("images/"+id).remove();
  }

  //displays larger version of a picture in a modal upon click on the picture
  const popupClickHandler = (itemId)=>{
    setPopup(!popup);
    setId(itemId);
  }

  //assigns a class to a modal to either show it or hide
  let cssClass;
    if(popup){
        cssClass = "test";
    }else{
        cssClass = "";
  }

  //displays a row of pictures from the array of data received via props from Layout component
  let display;
  if (props.pictures) {
    display = (
      <div className="gallery">
        {props.pictures.map(item=>{
          return(<GalleryItem data = {item} key={item.id} click={deleteClickHandler} popClick = {popupClickHandler}/>)
        })}
      </div>
    );
  }else {
    display = "";
  }

  //defines a picture to be displayed in a modal depending on id of selected picture
  let popupDisplay;
  if(id){
    let data = props.pictures.filter(item =>item.id===id);
    popupDisplay = (<img src={data[0].url} alt="Gallery item 5" className="popup__item"/>)
  }else{
    popupDisplay="";
  }

  return (
    <div >
      {display}

      {/* popup */}
      <div onClick = {()=>{popupClickHandler(false)}} className={cssClass}>
        {popupDisplay}
      </div>

    </div>
  );
}

export default Gallery;