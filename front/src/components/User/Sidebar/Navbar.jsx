import React from 'react'
import { IoMdHome } from "react-icons/io";
import {FaSearch} from "react-icons/fa"
import NavbarButton from './NavbarButton.jsx';
import {useSelector} from "react-redux"
const Navbar = () => {
  const user = useSelector((state)=> state.auth.userData)
  return (
    <>


    <div className='h-28 bg-neutral-900 rounded-lg'>
      <div className='flex flex-col gap-6 p-4'>

   <NavbarButton onClick={(e)=> console.log(user)} title = "Home" navbarIcon={<IoMdHome size ={22}/>}/>
    <NavbarButton title="Search" navbarIcon={<FaSearch size={18} />}/>
    </div>

    </div>
    </>
  )
}

export default Navbar