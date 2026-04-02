import React from "react";
import { useDispatch } from "react-redux";
import { setSongTitle } from "../redux/songTitleSlice";

const SidebarSong=({poster,title})=>{

  const dispatch = useDispatch();

  
  return(
    <div className="sidebarSong" onClick={()=>dispatch(setSongTitle(title))}>
      <img src={poster} alt="" />
      <span>{title}</span>
    </div>
  )
}

export default SidebarSong