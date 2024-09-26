import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./MainTweet.css";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster} from 'react-hot-toast';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TweetShare = ({ modelopened, setModelOpened }) => {
  // loading....

  const serverPublic =`/images/`;
  const [photo, setphoto] = useState(null);
  const [content, setContent] = useState("");

  const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();

   // Authorization
   const config = axios.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
    });
  // upload image
  const uploadImage = async (data) => {
    try {
    const newTweet=  await axios.post("/api/v1/tweet/upload", data,config);
    console.log(newTweet)
    toast.success(newTweet.data.message);
    navigate("/");
    setModelOpened(false);
    reset();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message); 
    }
  };

  //upload Tweet
  const uploadTweet = async (data) => {
    try {
      const newTweet = await axios.post(
        "/api/v1/tweet/create-tweet",
        data
      );
      console.log(newTweet.data)
      toast.success(newTweet.data.message);
      navigate("/");
      setModelOpened(false);
      reset();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message); 
    }
  };


  //for tweetPost

  const handleUpload = async(e) => {
    e.preventDefault();
    try {
      if(!photo){
        const newTweet = {
            userId: user._id,
            content: content,
          };
          uploadTweet(newTweet);
        }else{

            const myForm=  new FormData();
            myForm.append('content',content)
            myForm.append('userId',user._id)
            myForm.append('file',photo)
           uploadImage(myForm)
          
          }
          
            
    } catch (error) {
      console.log(error)
    }
  
  
  };

  // reset
  const reset = () => {
    setphoto(null);
    setContent("");
  };
  return (
    <>
      <Modal
        show={modelopened}
        onHide={() => {
          setModelOpened(false);
        }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>User New Tweet</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Toaster/>
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    //  ref={content}
                    placeholder="write a description"
                    required
                  />
                </div>

                <div className="mt-2">
                  <button className="btn btn-primary" onClick={handleUpload}>
                    Tweet
                  </button>
                  <div className="float-end  text-success">
                    <label className="btn btn-outline-secondary">
                      {photo ? photo.name : "uploade photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setphoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <>
                        <div className="ms-5 fs-4 fw-bold mt-2">
                          <RxCross1 onClick={() => setphoto(null)} />
                        </div>
                        <div className="text-center mt-2">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product"
                            height={"200px"}
                            width="90%"
                            className="img img-responsive"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TweetShare;
