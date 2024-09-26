import React from "react";
import { Link } from "react-router-dom";

const Users = ({ person }) => {
    const serverPublic =`/images/`;

  return (
    
  <Link to={`/profile/${person?._id}`} style={{ textDecoration: "none" }}>
      <div className="col-12 d-flex ">
        <img
          src={
            person.profilePicture
              ?  person.profilePicture
              : serverPublic + "default.avif"
          }
          className=" profile-pic"
          alt="Profile"
        />

        <p className="fs-6 text-dark ">
          <span className="d-flex ms-2 fs-5">{person?.name}</span>
          <span>@{person?.username}</span>
        </p>
      </div>
    </Link>
  
  
  );
};

export default Users;
