import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneDelete,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import {  toast } from "react-hot-toast";

const Tweet = ({ data, setData }) => {
  const [modelopened, setModelOpened] = useState(false);
  const [userdata, setUserData] = useState();
  const serverPublic =`/images/`;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dataStr = formatDistance(new Date(data.createdAt), new Date());
  const location = useLocation().pathname;

    //Authorization  
  const config = axios.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  //find all user
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const findUser = await axios.get(
          `/api/v1/user/get-user/${data.userId}`
        );
        setUserData(findUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [data.userId, data.likes]);

  //delete single tweet
  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/v1/tweet/delete-tweet/${data._id}`,
        config
      );
      if (location.includes("profile")) {
        const newData = await axios.get(
          `/api/v1/tweet/get-tweet/${user._id}`
        );
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(
          `/api/v1/tweet/explore`
        );
        setData(newData.data);
      } else {
        const newData = await axios.get(
          `/api/v1/tweet/${user._id}/timeline`
        );
        setData(newData.data);
      }
      toast.success("deleted");
    } catch (error) {
      console.log(error);
    }
  };

  //for like user

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/tweet/${data._id}/like`, {
        id: user._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(
          `/api/v1/tweet/get-tweet/${user._id}`
        );
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(
          `/api/v1/tweet/explore`
        );
        setData(newData.data);
      } else {
        const newData = await axios.get(
          `/api/v1/tweet/${user._id}/timeline`
        );
        setData(newData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      
      {userdata && (
        
        <div className="card rounded-0">
          <div className="row  px-3 pt-3 ">
            <div className="col-12 d-flex">
              <img
                src={
                  userdata.profilePicture
                    ?  userdata.profilePicture
                    : serverPublic + "default.avif"
                }
                className=" profile-pic"
                alt="Profile"
              />
              <Link
                to={`/profile/${userdata?._id}`}
                style={{ textDecoration: "none" }}
              >
                <p className=" ms-3 mt-3 text-dark ">@{userdata?.username}</p>
              </Link>
              <p className=" ms-3 mt-3 text-muted"> -{dataStr}</p>
              {user._id === data.userId ? (
                <AiTwotoneDelete
                  className=" ms-3 mt-3 ms-auto text-danger fs-4"
                  onClick={handleDelete}
                />
              ) : (
                ""
              )}
            </div>
            <div className="ms-4">
              <div className="col-12">
                <h6 className="ms-2 w-75" style={{ color: "#3a3636" }}>
                  {data.content}
                </h6>
                <img
                   src={data.photo}
                  // src={
                  //   data.image
                  //     ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
                  //     : ""
                  // }
                  alt="..."
                  width={"85%"}
                  height="250px"
                ></img>
              </div>

              <div className="col-12  " style={{ cursor: "pointer" }}>
                <span onClick={handleLike}>
                  {data.likes.includes(user._id) ? (
                    <AiFillHeart className="text-danger fs-4" />
                  ) : (
                    <AiOutlineHeart className="fs-4" />
                  )}
                </span>
                <AiOutlineComment
                  className="ms-3 fs-3"
                  onClick={() => setModelOpened(true)}
                />
                <Comment
                  modelopened={modelopened}
                  setModelOpened={setModelOpened}
                  data={data}
                  userdata={userdata}
                  setData={setData}
                />
                <sub className="fw-bold">
                  {data.comments.length === 0 ? "" : data.comments.length}
                </sub>
                <p>{data.likes.length} likes</p>
                {data.comments.map((comment, id) => {
                  return (
                    <ul key={id}>
                      @{comment.commentedby?.name}
                      <li className="ms-4">{comment.comment}</li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
      )}
      
    </>
  );
};

export default Tweet;
