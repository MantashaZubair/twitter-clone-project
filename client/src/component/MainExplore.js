import React from "react";
import ExploreTweet from "./ExploreTweet";
import { MdOutlineStarRate } from "react-icons/md";


const MainExplore = () => {
  return (
    <div className="card mt-4 card-tweet ">
      <div className="container">
        <p className="fs-5 fw-bold mt-3 ms-2">
          Explore <MdOutlineStarRate className="float-end fs-4" />
        </p>
        <div className="mt-4">
          <ExploreTweet />
        </div>
      </div>
    </div>
  );
};

export default MainExplore;
