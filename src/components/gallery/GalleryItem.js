import React, {useState}  from 'react';
import "./Gallery.css";


function GalleryItem(props) {

    const [show, setShow] = useState(true); //hides the picture upon click on delete button (button available only for logged in users)

    //transfers id of the picture to the Gallery component if it is clicked to be shown in a modal
    const poppupClickHandler = ()=>{
        props.popClick(props.data.id);
    }

    // deletes the picture
    const deleteClick = (e)=>{
        props.click(props.data.id);
        setShow(false);
    }

    //shows or doesn't show delete icon depending on authentication status
    let deleteIcon;
    if(localStorage.getItem("isAuthenticated")==="true"){
        deleteIcon = (<div className="deleteIcon" onClick = {deleteClick}>
                        <img src="https://img.icons8.com/carbon-copy/100/000000/delete-forever--v1.png" alt="Delete icon" className="deleteIcon--img" />
                      </div>);
    }else{
        deleteIcon = null;
    }
    
    
    // Shows a picture untill delete icon is clicked
    let display;
    if(show){
        display = (
            <figure className="gallery__item">
                {deleteIcon}
                <img src={props.data.url} alt="Gallery item 5" className="gallery__img"/>
                <figcaption className="gallery__item--descr">
                    <span className="gallery__item--descr-title">{props.data.title}</span>
                    <span className="gallery__item--descr-text">{props.data.description}</span>
                </figcaption>
            </figure>
        );
    }else{
        display = null;
    }
    

    return (
        <div onClick={poppupClickHandler}>
            {display}
        </div>
        
    );
  }
  
export default GalleryItem;