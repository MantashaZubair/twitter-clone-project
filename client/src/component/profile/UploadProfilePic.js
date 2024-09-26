import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { updateUserCoverImage, updateUserProfileImage } from "../../actions/UserAction";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


const UploadProfilePic = ({ imageModelOpened, setImageModelOpened}) => {
  const [profilePicture, setprofilePicture] = useState(null);
  const [coverPicture, setcoverPicture] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(profilePicture) {
      const data=  new FormData();
      data.append("file", profilePicture);
        dispatch(updateUserProfileImage(param.id, data));
        setImageModelOpened(false);
        toast.success(`upload your profilepicture`)
    }
    if(coverPicture){
      const coverprofile=  new FormData();
      coverprofile.append("file", coverPicture);
        dispatch(updateUserCoverImage(param.id,coverprofile ));
        setImageModelOpened(false);
        toast.success(`upload your coverpicture`)
    }
    
    
  };

  return (
    <div>
      <Modal
        show={imageModelOpened}
        onHide={() => {
          setImageModelOpened(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Upload Profile Pic</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-lg-6 col-md-6">
              <div className=" text-success">
                <label className="btn btn-outline-secondary">
                  {profilePicture
                    ? profilePicture.name
                    : "uploade Profile Image"}
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={(e) => setprofilePicture(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3 me-3">
                {profilePicture && (
                  <>
                    <div className="ms-5 fs-4 fw-bold mt-2">
                      <RxCross1 onClick={() => setprofilePicture(null)} />
                    </div>
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(profilePicture)}
                        alt="product"
                        height={"200px"}
                        width="320px"
                        className="img img-responsive"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6">
              <div className=" text-success">
                <label className="btn btn-outline-secondary ">
                  {coverPicture ? coverPicture.name : "uploade Cover Image"}
                  <input
                    type="file"
                    name="coverPicture"
                    accept="image/*"
                    onChange={(e) => setcoverPicture(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {coverPicture && (
                  <>
                    <div className="ms-5 fs-4 fw-bold mt-2">
                      <RxCross1 onClick={() => setcoverPicture(null)} />
                    </div>
                    <div className=" mt-2">
                      <img
                        src={URL.createObjectURL(coverPicture)}
                        alt="product"
                        height={"200px"}
                        width="320px"
                        className="img img-responsive"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Upload Profile
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadProfilePic;
