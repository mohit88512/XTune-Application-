import React, { useEffect, useState } from "react";
import HomeSong from "./homeSong";
import axios from "axios";
import { useSelector } from "react-redux";


const Home=()=>{
  const musiclistAPI = import.meta.env.VITE_MUSICLISTAPI;

  const {name} = useSelector(state=>state.user)

  const [data,setData]=useState([])

  useEffect(()=>{
    music();
  },[])

  async function music() {
    try{
      await axios(`${musiclistAPI}musicdata`)
      .then(res=>setData(res.data.data))
    }
    catch(err){
      console.log(err)
    }
  }
  return(  
    <div className="home">
      {name && <h1>Welcome, {name.toUpperCase()}</h1>}
      {data.map((item,index)=>(
        <div key={index}>
          <h1>{item.heading}</h1>

          <div className="block">
            {item.titleCard.map((title,index)=>(
              <HomeSong key={index} title={title} image={item.photoURL[index]} />
            ))}
          </div>
        </div>  
      ))}          
    </div>   
  )
}

export default Home