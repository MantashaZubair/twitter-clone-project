import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useLocation} from "react-router-dom";

const Comment = ({ modelopened, setModelOpened, data, userdata, setData }) => {
  const [comment, setComment] = useState();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic =`/images/`;
  const location = useLocation().pathname;
  //Authorization
  const config = axios.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

  //comment
  const handleComment = async (e) => {
    e.preventDefault();
    const comments = {
      commentedby: user,
      comment: comment,
    };
    if(!comments.comment)
    return alert("comment is required")
    try {
      await axios.put(
        `/api/v1/tweet/${data._id}/comment`,
        comments , config
      );
      setModelOpened(false);
      setComment("");
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
    <Modal
      show={modelopened}
      onHide={() => {
        setModelOpened(false);
      }}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>comment</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <p className="fs-5 ms-3 mt-2 text-dark ">@{userdata?.username}</p>
        </div>
        <div className="container">
          <div className="card p-3 rounded-0">
            <div className="row    ">
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
              <div className="col-12 mt-2">
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="write a description"
                  required
                />
              </div>
              <div className="mt-2">
                <button className="btn btn-primary" onClick={handleComment}>
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        
              {data.comments.map((comment, id) => {
                return (
                  <div key={id}>
                  <div className="container ">
          <div className="card p-3 rounded-0 mt-3 ">
            <div className="row">
                    <div className="col-12 d-flex">
                      <img
                        src={
                          comment.commentedby?.profilePicture
                            ? comment.commentedby?.profilePicture
                            : serverPublic + "default.avif"
                        }
                        className=" profile-pic"
                        alt="Profile"
                      />
                      <p className="fs-6 ms-3 mt-2 text-dark">
                        @{comment.commentedby?.name}
                      </p>
                    </div>
                    <div className="col-12 fs-6 mt-1 ms-2" key={id}>
                        <li>{comment.comment}</li>
                    </div>
                  </div>
                  </div>
          </div>
        </div>
                );
              })}
          
      </Modal.Body>
    </Modal>
  );
};

export default Comment;




