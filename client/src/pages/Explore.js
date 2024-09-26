import React, { useState } from 'react'
import LeftSidebar from '../component/LeftSidebar'
import "./HomePage.css"
import MainExplore from '../component/MainExplore'

const Explore = () => {
   const [isSidebarActive , setIsSidebarActive]= useState(false)
   const toggleSidebar =()=>{
      setIsSidebarActive((pre)=>!pre)
   }
  return (
   
  <div className='container'>
      <div className='row '>
         <div className='col-lg-3 mt-4'>
         <button className='toggle-button' onClick={toggleSidebar}>{isSidebarActive? <>X</>: <>☰</>}</button>
         <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
         <LeftSidebar/>
         </div>
         </div>
         <div className='col-lg-6  mt-5'>
            <MainExplore/>
         </div>
      </div>
    </div>
  
  )
}

export default Explore