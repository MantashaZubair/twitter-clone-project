import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../actions/AuthAction";
import { toast } from "react-hot-toast";



const EditProfile = ({ modelopened, setModelOpened, data }) => {
  const { password, ...other } = data;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const param = useParams();
  const [formData, setFormData] = useState(other);

 // Authorization
      const config = axios.interceptors.request.use((req) => {
      if (localStorage.getItem('profile')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
      }

      return req;
      });

// const config = {
//   // headers :{
//   //   "Content-Type" :"application/json",
//   //   "Authorization": localStorage.getItem('profile').token
//   // }
// }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(param.id, formData));
    toast.success(`updated your profile`)
    setModelOpened(false);
  };

  const onDeleteHandler = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete your account?");
      if (!answer) return;
      await axios.delete(
        `/api/v1/user/delete-user/${param.id}`,config
      );
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        show={modelopened}
        onHide={() => {
          setModelOpened(false);
        }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Edit Profile</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmitHandler}>
            <div>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  className="form-control"
                  placeholder="enter your name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  className="form-control"
                  placeholder="enter your location"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  className="form-control"
                  placeholder="enter your dob"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
          <button
            type="submit"
            className="ms-4  btn btn-danger"
            onClick={onDeleteHandler}
          >
            Delete
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProfile;
