import { useState } from "react";
import ImageContext from "./Imagecontext";

const ImageProvider=({children})=>{

  const [img,setImg]=useState("")

  return(
    <ImageContext.Provider value={{img,setImg}}>
      {children}
    </ImageContext.Provider>
  )
}

export default ImageProvider