import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Cookies from "js-cookie"
import axios from "axios"
import {useDispatch} from "react-redux"
import { addFavourite } from '../../../store/musicSlice';
import { IoPencil } from "react-icons/io5";

const CurrSong = ({ song, artist, songName, songCover, isFavourite }) => {
  const dispatch = useDispatch();

  // Function to handle adding to favorites
  console.log(isFavourite);
  
  async function handleFav() {
    try {
      const accessToken = Cookies.get("accessToken");

      const data = await axios.post("http://localhost:3000/api/v1/users/add-fav", { song },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      console.log(data.data.data.isFav);
      const isFav = data.data.data.isFav;
   dispatch(addFavourite(isFav))


    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to call handleFav on mount and whenever it's updated
  useEffect(() => {
    
    handleFav();
  }, []);

  return (
    <div className='flex gap-4 items-center'>
      <div className='w-14 overflow-hidden h-14 rounded-md'>
        <img src={songCover || "/Talha-Anjum.jpg"} alt="" />
      </div>
      <div className='flex flex-col gap-2'>
        <Link to="/artist">
          
          <div className='w-40 overflow-hidden h-5 whitespace-nowrap md:w-60 cursor-pointer' >
            <p className='hover:underline transition-all'>{songName || ""}</p>
          </div>
        </Link>
        <Link>
          <div className=''>
            <p className='hover:underline transition-all'>{artist || ""}</p>
          </div>
        </Link>
      </div>
      <div>
        <button onClick={handleFav}>
          { isFavourite ? ( <IoIosHeart size={20} /> ) : ( <IoIosHeartEmpty size={20}/> )}
        </button>
      </div>
    </div>
  )
}

export default CurrSong;
