import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import "./Song.css"
import { playSong } from '../../../store/musicSlice';
import {useDispatch,useSelector} from 'react-redux'
import axios from "axios"
import Cookies from 'js-cookie';
function SongCard({song}) {
  const {songCover,songName,createdBy,songFile} =song;

  const artist = createdBy[0].creatorName; 
  const [isFav,setIsFav] = useState(false)
  const dispatch= useDispatch();
  const currSong = useSelector((state)=> state.music.currSong)
  const songList = useSelector((state)=> state.music.songList)
  const handlePLay =()=> {
    const music = {
      songName,
      artist,
      index:0,
      isFavourite:isFav,
      songFile,
      songCover,
      songPlayed:true,
      song,
    }
    console.log(music);
      dispatch(playSong(music))

}
  useEffect(()=> {


    async function handleFav() {
      try {
        const accessToken = Cookies.get("accessToken");
     
        const data = await axios.post("http://localhost:3000/api/v1/users/is-fav", { song },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(data.data.data.isFav);
        
      setIsFav(data.data.data.isFav)
  
      
    } catch (error) {
      console.log(error);
    }
  };
  handleFav();
},[handlePLay])
 

  return (
    <div className='p-4 relative group hover:bg-white/40 peer hover:backdrop-blur-md rounded-md flex flex-col gap-4 '>
        <div className='h-52 overflow-hidden w-52 rounded-md '>
            <img src={songCover} alt="" height={4} width={40} className='w-full h-full'/>
        </div>
        
        <div className=''>
            <p className='font-bold text-white text-base'>{songName}</p>
            <p className='text-white text-xs'>{artist}</p>
        </div>
        <button className='p-4 absolute right-5 bottom-10 bg-green-500 hidden group-hover:block rounded-full hover:scale-110' onClick={handlePLay}><FaPlay/></button>  
    </div>
  )
}

export default SongCard