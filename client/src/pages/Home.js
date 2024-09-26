import React, { useState } from 'react'
import LeftSidebar from '../component/LeftSidebar'
import MainTweet from '../component/MainTweet'
import "./HomePage.css"
const Home = () => {
   const [isSidebarActive , setIsSidebarActive]= useState(false)
   const toggleSidebar =()=>{
      setIsSidebarActive((pre)=>!pre)
   }
  return (

 <div className='container' style={{overflow:"hidden"}} >
      <div className='row '>
         <div className="col-lg-3 mt-4">
         <button className='toggle-button' onClick={toggleSidebar}>{isSidebarActive? <>X</>: <>☰</>}</button>
         <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
         <LeftSidebar/>
         </div>
           
         </div>
         <div className='col-lg-6  mt-5'>
            <MainTweet/>
         </div>
      </div>
    </div>
   
  )
}

export default Home