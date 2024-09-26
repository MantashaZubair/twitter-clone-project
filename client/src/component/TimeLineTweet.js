import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

import axios from "axios";
import { Toaster } from "react-hot-toast";
const TimeLineTweet = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [timeLine, setTimeLine] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          `/api/v1/tweet/${user._id}/timeline`
        );
        setTimeLine(timelineTweets.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user._id, user.comments]);

  return (
    <div className="container mt-2">
    
      {timeLine &&
        timeLine.map((tweet, id) => {
          
          return (
            <div className="mb-2" key={id}>
            <Toaster/>
              <Tweet data={tweet} setData={setTimeLine} />
            </div>
          );
        })}
    </div>
  );
};

export default TimeLineTweet;
