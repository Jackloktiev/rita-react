import React from "react";
import "./Sidebar.css";

const CategoryItem = (props)=>{

    // transfers value of clicked category item to Sidebar component to only show images from that category
    const clickHandler = ()=>{
        props.click(props.value);
    }

    return(
    <li className="sidebar__list-item" onClick = {clickHandler}>{props.value}</li>
    )
}

export default CategoryItem;