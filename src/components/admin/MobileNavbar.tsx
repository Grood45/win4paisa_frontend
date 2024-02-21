"use client"
import React, { useEffect, useState } from 'react'
import {HiOutlineMenu} from "react-icons/hi"
import {BiUserCircle} from "react-icons/bi"
import Sidebar from './Sidebar'
const MobileNavbar = () => {
  const [show,setShow]=useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const ShowSidebar=()=>{
setShow(!show)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Adjust the scroll limit to your desired value
      const scrollLimit = 5;

      // Hide the navbar if the scroll position exceeds the limit
      setIsNavbarVisible(scrollPosition < scrollLimit);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='sticky top-0 z-[1000]'>
      
    <div  className={` flex justify-between p-3 z-[1000]  w-[100%]  rounded-xl  ${
        isNavbarVisible ? "" : "bg-[#052860] border  border-[#A0AEC0] shadow-2xl"
      } w-[100%]`}>
        <div >
            <HiOutlineMenu onClick={ShowSidebar} fontSize="30px" color="white"/>
        </div>
        <div>
            <BiUserCircle fontSize="35px" color="white"/>
        </div>
 
       

    </div>
       <div className='fixed top-0 bg-red left-0  '>
    {show && <Sidebar setShow={setShow} status={1}/>}
  </div>
    </div>

  )
}

export default MobileNavbar