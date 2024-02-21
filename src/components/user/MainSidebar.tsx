import React from 'react'
import SidebarNavbar from './SidebarNavbar'
import { useAppSelector } from '@/app/redux-arch/store';

const MainSidebar = () => {

    const { showSideBar1, theme } = useAppSelector(
        (store) => store.combineR.NavStateReducer
      );
    
  return (
    <div>

    
    <div className="hidden lg:contents">
    <div className=" ">
      <SidebarNavbar identity={1} value={1} />
    </div>
  </div>

   {showSideBar1 && ( 
  <div className="contents lg:hidden">
    <div className=" fixed top-[64px]  left-0 z-[1000]  ">
      <SidebarNavbar identity={2} value={1} />
    </div>
  </div>
    )} 
    </div>
  )
}

export default MainSidebar