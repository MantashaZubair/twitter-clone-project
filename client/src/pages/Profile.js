import React, { useState } from "react";
import LeftSidebar from "../component/LeftSidebar";
import { MdOutlineStarRate } from "react-icons/md";
import ProfileCard from "../component/profile/ProfileCard";
import RightSidebar from "../component/RightSidebar";
import "./HomePage.css"
const Profile = () => {
  const [isSidebarActive , setIsSidebarActive]= useState(false)
  const toggleSidebar =()=>{
     setIsSidebarActive((pre)=>!pre)
  }
  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-3 mt-4">
        <button className='toggle-button' onClick={toggleSidebar}>{isSidebarActive? <>X</>: <>☰</>}</button>
         <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
         <LeftSidebar/>
         </div>
        </div>
        <div className="col-lg-6  mt-5">
          <div className="card card-tweet">
            <div className="container">
              <p className="fs-5 fw-bold mt-3 ms-2">
                Profile <MdOutlineStarRate className="float-end fs-4" />
              </p>
              <ProfileCard />
            </div>
          </div>
        </div>
        <div className="col-lg-3 text-center  mt-4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
