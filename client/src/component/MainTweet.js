import React, { useState } from "react";
import { MdOutlineStarRate } from "react-icons/md";
import TimeLineTweet from "./TimeLineTweet";
import TweetShare from "./TweetShare";
import "./MainTweet.css";
import { useSelector } from "react-redux";

const MainTweet = () => {
  const [modelopened, setModelOpened] = useState(false);
  const serverPublic =`/images/`;
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="card card-tweet">
      <div className="container">
        <p className="fs-5 fw-bold mt-3 ms-2">
          Home <MdOutlineStarRate className="float-end fs-4" />
        </p>

        <div className="mt-3">
          <div className="col-12 d-flex ">
            <img
              src={
                user.profilePicture
                  ?  user.profilePicture
                  : serverPublic + "default.avif"
              }
              className=" profile-pic"
              alt="Profile"
            />
            <p className="fs-5 ms-3 mt-2 text-dark">@{user.username}</p>
          </div>
          <button
            className=" m-3 btn btn-primary"
            onClick={() => setModelOpened(true)}
          >
            tweet
          </button>
          <TweetShare
            modelopened={modelopened}
            setModelOpened={setModelOpened}
          />
          
          <TimeLineTweet />
        </div>
      </div>
    </div>
  );
};

export default MainTweet;
