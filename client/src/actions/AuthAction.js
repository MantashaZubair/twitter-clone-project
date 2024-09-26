import { toast } from "react-hot-toast"
import axios from "axios"

//  login action
export const login = (formData) => async(dispatch) => {
    dispatch({type : "AUTH_START"})
    try {
        const {data}= await axios.post('/api/v1/auth/login',formData)
        dispatch({type : "AUTH_SUCCESS" , data:data}) 
        toast.success(data.response && data.response.data.message ? data.response.data.message :data.message)
        
    } catch (error) {
       console.log(error) 
       dispatch({type : "AUTH_FAIL"}) 
       toast.error(error.response && error.response.data.message ? error.response.data.message :error.message)
    }
}

//signup action
export const register = (formData) => async(dispatch) => {
    dispatch({type : "AUTH_START"})
    try {
        const {data}= await axios.post('/api/v1/auth/register',formData) 
        dispatch({type : "AUTH_SUCCESS", data:data})
        toast.success(data.response && data.response.data.message ? data.response.data.message :data.message)
        
        
    } catch (error) {
       console.log(error) 
       dispatch({type : "AUTH_FAIL"}) 
       toast.error(error.response && error.response.data.message ? error.response.data.message :error.message )
    }
}

//logout action 
export const logout = ()=> async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
}


