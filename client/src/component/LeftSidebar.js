import React from "react";
import { NavLink } from "react-router-dom";
import twitterlogo from "../Images/twitterlogo.png";
import { AiFillHome, AiOutlineTwitter } from "react-icons/ai";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/AuthAction";

const LeftSidebar = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="container">
      <div className="me-5">
        <img src={twitterlogo} width="55px" height={"45px"} alt="twitterlogo" />
      </div>
      <div className="d-flex flex-column ms-4 pt-4">
        <NavLink to="/" className="mb-3 nav-link fw-bold">
          <AiFillHome className="fs-4 me-3" />
          Home
        </NavLink>
        <NavLink to="/explore" className="mb-3 nav-link fw-bold">
          <AiOutlineTwitter className="fs-4 me-3" />
          Explore
        </NavLink>
        <NavLink
          to={`/profile/${user?._id}`}
          className="mb-3 nav-link fw-bold "
        >
          <CgProfile className="fs-4 me-3" />
          Profile
        </NavLink>
        <NavLink onClick={handleLogout} to="" className="nav-link fw-bold">
          <CgLogOut className="fs-4 me-3" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default LeftSidebar;
