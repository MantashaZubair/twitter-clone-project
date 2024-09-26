import axios from "axios";
import React, { useEffect, useState } from "react";
import Users from "./Users";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  //get all user  from user route
  const fetchUser = async () => {
    try {
      const allusers = await axios.get(`/api/v1/user/get-user`);
      setPersons(allusers.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="card rounded-0 border-0">
      <div className="container">
        <p className="fs-5 fw-bold mt-2 ms-2">AllUsers</p>
      </div>
      <div style={{boxShadow : "rgba(0, 0, 0, 0.16) 0px 1px 4px", padding:"10px", overflow:"scroll", height:"100vh"}}>
        {persons.map((person, id) => {
          {
            /* if (person._id !== user._id) */
          }
          return (
            <div className="card py-2 px-1 mb-2 " key={id}>
              <div className="container">
                {" "}
                <Users person={person} key={id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
