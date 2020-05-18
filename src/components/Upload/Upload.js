import React, { useState, useContext } from 'react';
import "./Upload.css";
import firebase from 'firebase';
import {AuthContext} from "../Context";

//configure firebase
var firebaseConfig = {
    apiKey: "AIzaSyDwpRDX6iAMTsOUu0L6BIWb7Mypnvu2WB0",
    authDomain: "rita-a448c.firebaseapp.com",
    databaseURL: "https://rita-a448c.firebaseio.com",
    projectId: "rita-a448c",
    storageBucket: "rita-a448c.appspot.com",
    messagingSenderId: "1063849712384",
    appId: "1:1063849712384:web:c5bba1f221b115185ff1e5"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

//Component
function Upload() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageURL] = useState(null);
    const [progress, setProgress] = useState(0);
    const [successInd, setSucessInd] = useState("");
    const [uploadInd, setUploadInd] = useState("");


    const authContext = useContext(AuthContext); // whether user is authenticated or not

    // click on sign in button
    const signInCLickHandler = event => {
        event.preventDefault();
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

                localStorage.setItem("isAuthenticated", true );
                authContext.login();
            } else {

              localStorage.setItem("isAuthenticated", false );
              authContext.logout();
            }
          });
    }
    //click on sign out button
    const signOutCLickHandler = event =>{
        event.preventDefault();
        firebase.auth().signOut().then(response=>{
 
            authContext.logout();
            localStorage.setItem("isAuthenticated", false );
        });
    }

    //save the name of the file choosen in file picker to state
    const fileChangeHandler = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    //upload file to firebase storage and save download URL
    const submitClickHandler = (event) => {
        event.preventDefault();
        const storage = firebase.storage();
        const storageRef = storage.ref(`images/${image.name}`);
        const uploadTask = storageRef.put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            error => {
                if(error.code==="storage/unauthorized"){
                    setUploadInd("Ooops. You have to sign in.");
                }else{
                    setUploadInd("Something went wrong. Please try again.");
                }
            },
            ()=> {
                setUploadInd("Picture uploaded successfully");
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{ setImageURL(url)});
            }
        );
    }

    //Add picture along with relevant info to the database
    const addPictureCLickHandler = (event) => {
        event.preventDefault();
        setUploadInd("")
        let pictureData = {
            title: title,
            description: description,
            category:category,
            url: imageUrl
        }
        const dataBase = firebase.database();
        dataBase.ref("/images/").push(pictureData, error=>{
            if(error){
                setSucessInd("Something went wrong. Please try again.");
            }else{
                setSucessInd("Item added to your portfolio");
                setTitle("");
                setDescription("");
                setCategory("");
                setImageURL("");
                setProgress(0);
            }
        });
    }

    //--Change handlers--
    const titleChangeHandler = (event)=>{
        setTitle(event.target.value);
    }
    const descriptionChangeHandler = (event)=>{
        setDescription(event.target.value);
    }
    const categoryChangeHandler = (event)=>{
        setCategory(event.target.value);
    }

    //converts boolean as a string into true boolean
    const convToBool = param => {
        if(param === "true"){
            return true;
        }else if(param===true){
            return true;
        }else{
            return false;
        }
    }
    

    return (
        <div className = "Upload">
            {convToBool(authContext.isAuth)?
            <button className = "button authbutton" onClick = {signOutCLickHandler}>Sign Out</button>:
            <button className = "button authbutton" onClick = {signInCLickHandler}>Sign in with Google</button>}

            <form className = "upload-form">
                <label htmlFor="name" className="label">Title</label>
                <input type="text" name="title" id = "title" placeholder="Title" className="input" value={title} onChange={titleChangeHandler}></input>

                <label htmlFor="description" className="label">Description</label>
                <input type="text" name="description" id = "description" placeholder="Description" className="input" value={description} onChange={descriptionChangeHandler}></input>

                <label htmlFor="category" className="label">Category</label>
                <input type="text" name="category" id = "category" placeholder="Category" className="input" value={category} onChange={categoryChangeHandler}></input>

                

                <div className="uploadContainer">
                    <label htmlFor="file" className="label">Attach file</label>
                    <input type="file" name="file" id = "file" placeholder="Title" className="button buttonUpload" onChange={fileChangeHandler}></input>

                    <progress value={progress} max="100" className="progressBar" />
                </div>

                <button className = "button" onClick = {submitClickHandler}>Upload picture</button>

                <div className="successInd"><p>{uploadInd}</p></div>

                <button className = "button" onClick = {addPictureCLickHandler}>Add to portfolio</button>

                <div className="successInd"><p>{successInd}</p></div>

                

                
                
            </form>
        </div>
    );
  }
  
export default Upload;