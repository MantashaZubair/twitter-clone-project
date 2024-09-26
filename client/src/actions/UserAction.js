import axios from "axios";



axios.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const updateUser = (id,formData)=>async(dispatch)=>{
    dispatch ({type:"UPDATING_START"})
    try{
        const {data}= await axios.put(`/api/v1/user/update-profile/${id}`,formData)
        dispatch ({type:"UPDATING_SUCCESS", data:data})
    }
    catch(error){
        dispatch ({type:"UPDATING_FAIL"})
    }
}

// updateUserProfileImage
export const updateUserProfileImage = (id,formData)=>async(dispatch)=>{
  dispatch ({type:"UPDATING_START"})
  try{
      const {data}= await axios.put(`/api/v1/user/update-profile-image/${id}`,formData)
      dispatch ({type:"UPDATING_SUCCESS", data:data})
  }
  catch(error){
      dispatch ({type:"UPDATING_FAIL"})
  }
}
// updateUserCoverImage
export const updateUserCoverImage = (id,formData)=>async(dispatch)=>{
  dispatch ({type:"UPDATING_START"})
  try{
      const {data}= await axios.put(`/api/v1/user/update-cover-image/${id}`,formData)
      dispatch ({type:"UPDATING_SUCCESS", data:data})
  }
  catch(error){
      dispatch ({type:"UPDATING_FAIL"})
  }
}

export const followUser = (id,data)=>async(dispatch)=>{
  dispatch ({type:"FOLLOW_USER", data:id})
  await axios.put(`/api/v1/user/follow/${id}`,data)
}
export const unfollowUser = (id,data)=>async(dispatch)=>{
  dispatch ({type:"UNFOLLOW_USER", data:id})
  await axios.put(`/api/v1/user/unfollow/${id}`,data)
}

