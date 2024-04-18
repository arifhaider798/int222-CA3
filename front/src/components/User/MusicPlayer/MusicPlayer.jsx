import React, { useRef, useState } from 'react'
import CurrSong from './CurrSong'
import Control from './Control'
import Volume from './Volume'
;
import {useDispatch,useSelector} from "react-redux"
const MusicPlayer = () => {
  const dispatch =useDispatch();
  const currSong = useSelector((state)=> state.music.currSong)
  
  const {song,songCover,songFile,songName,artist,isFavourite} = currSong;
  const progressBarRef = useRef();
  const audioRef = useRef();
  const [timeProgress,setTimeProgress]= useState(0);
  const [duration,setDuration] = useState(0);
  
  return (
    <div className='bg-neutral-950 text-white flex justify-between w-screen px-8 py-4 gap-4 items-center'>
        <CurrSong {...{song,songName,artist,songCover,isFavourite}} />
        <Control {...{songFile,progressBarRef,audioRef,timeProgress,setTimeProgress,duration,setDuration}}/>
        <Volume {...{audioRef}} />

    </div>
  )
}

export default MusicPlayer