import React, { useState } from "react";
import { useContext } from "react";
import ImageContext from "../context/Imagecontext";
import { useNavigate } from "react-router-dom";

const HomeSong=({title,image})=>{

  const navigate = useNavigate();

  const {setImg}=useContext(ImageContext)

  const handleClick = () => {
    setImg(image);
    navigate(`/music/${title}`);
  };

  return(
    <div key={title} className="home-song" onClick={handleClick}>
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  )
}

export default HomeSong