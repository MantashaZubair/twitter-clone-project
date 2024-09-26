import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDateRange, MdOutlineLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import UploadProfilePic from "./UploadProfilePic";
import Tweet from "../Tweet";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Toaster, toast } from "react-hot-toast";


const ProfileCard = () => {
  const [modelopened, setModelOpened] = useState(false);
  const [imageModelOpened, setImageModelOpened] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const serverPublic =`/images/`;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [userTweet, setUserTweet] = useState(null);
  const navigate = useNavigate()

  //get user tweet
  const UserTweetData = async () => {
    try {
      const userTweets = await axios.get(
        `/api/v1/tweet/get-tweet/${id}`
      );
      setUserTweet(userTweets?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    UserTweetData();
  }, [user,id]);



  //find all user
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (id === user?._id) {
        setUserProfile(user);
      } else{
        const userProfile = await axios.get(
            `/api/v1/user/get-user/${id}`, 
          );
          setUserProfile(userProfile?.data); 
        } 
      }
    fetchUserProfile();

  }, [user,id]);

  //follow user
  const handleFollow = async (e) => {
    e.preventDefault();
    if (user.following.includes(id)) {
      try {
        dispatch(unfollowUser(id, { id: user._id }));
        navigate(`/profile/${user._id}`)
        toast.success(`unfollowed by ${userProfile.name}`)
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch(followUser(id, { id: user._id }));
        navigate(`/profile/${user._id}`)
        toast.success(`followed by ${userProfile.name}`)
      } catch (error) {
        console.log(error);
      }
    }
  };
 

  return (
    <>
      <div className="card pb-4 shadow">
      <Toaster/>
        <div className="row">
          <div className="col-12">
            <img
              src={
                userProfile.coverPicture
                  ?  userProfile.coverPicture
                  : serverPublic + "background.jpg"
              }
              alt="coverImage"
              width="100%"
              height={"140px"}
            />
            <div className="m-3">
              <div className="row">
                <div className="col-6">
                  <img
                    src={
                      userProfile.profilePicture
                        ?  userProfile.profilePicture
                        : serverPublic + "default.avif"
                    }
                    className=" mt-2 profile-pic"
                    alt="Profile"
                  />
                </div>
                <div className="col-6 d-flex  justify-content-end">
                  {user._id === id ? (
                    <>
                      <button
                        className="m-3"
                        onClick={() => setImageModelOpened(true)}
                      >
                        Uploade Profile Photo
                      </button>
                      <UploadProfilePic
                        imageModelOpened={imageModelOpened}
                        setImageModelOpened={setImageModelOpened}
                        data={user}
                      />
                      <button
                        className=" m-3"
                        onClick={() => setModelOpened(true)}
                      >
                        Edit
                      </button>
                      <EditProfile
                        modelopened={modelopened}
                        setModelOpened={setModelOpened}
                        data={user}
                      />
                    </>
                  ) : (
                    <button className="m-3" onClick={handleFollow}>
                      {user?.following?.includes(id) ? "unfollow" : "follow"}
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-2 ms-1 fs-5 ">{userProfile?.name}</p>
              <p className=" ms-1 ">@{userProfile?.username}</p>

              <div className="ms-2">
                <span className="me-5">
                  <MdOutlineDateRange className="me-2 fs-4" />
                  {userProfile?.DOB ? userProfile.DOB : "..."}
                </span>
                <span className="ms-5">
                  <MdOutlineLocationOn className="me-2 fs-4" />
                  {userProfile?.location ? userProfile.location : "..."}
                </span>
                <p className="mt-3 ">
                  {" "}
                  Join <span className="ms-2">-{userProfile.createdAt}</span>
                </p>
                <div>
                  <span className="fw-bold ms-2">Following</span>
                  <span className="fw-bold ms-5">Followers</span>
                </div>
                <div className="ms-5">
                  <span className="me-5 fw-bold">
                    {userProfile?.following
                      ? userProfile.following.length
                      : "0"}
                  </span>
                  <span className="ms-5 fw-bold ">
                    {userProfile?.followers
                      ? userProfile.followers.length
                      : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {user._id===id && (
          <div className=" mt-2">
            <p className="fw-bold mt-3">User Tweet</p>
            {userTweet &&
              userTweet.map((tweet) => {
                return (
                  <div className="mb-2" key={tweet._id}>
                    <Tweet data={tweet} setData={setUserTweet} id={id} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
