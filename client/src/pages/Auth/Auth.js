import React, { useState } from 'react'
import { Toaster} from 'react-hot-toast';
import leftimg  from "../../Images/twitter.jpg"

import {useDispatch, useSelector} from "react-redux"
import "./Auth.css"
import { login, register } from '../../actions/AuthAction'

const Auth = () => {
    const dispatch = useDispatch()
   
   
    const loading = useSelector((state)=>state.authReducer.loading)
    const [isRegister, setIsRegister] = useState(true)
    console.log(loading)
    const [ data,setDate ]= useState({name :"", username:"", email:"", password:"", confirmpass:""})

    const handleChange = (e)=>{
      setDate({...data, [e.target.name]: e.target.value})
    }

    const [confirmPassword, setConfirmPassword]= useState(true)

    const handleSubmit = (e)=>{
      e.preventDefault()
      if(isRegister){
        data.password === data.confirmpass? dispatch(register(data)): setConfirmPassword(false)
        
      }else{
        dispatch(login(data ))
      }
    }

    const resetForm = ()=>{
      setConfirmPassword(true)
      setDate({
        name :"", username:"", email:"", password:"", confirmpass:""
      })
    }

  return (
    <div className='container'>
    <Toaster/>
    <div className='row d-flex justify-content-center align-items-center h-100'>
      <div className='col-sm-11 col-md-12 col-lg-7'>
      <div className="card card-login">
      <div className='row '>
      <div className='col-sm-11 col-md-5 '>
      <img src={leftimg}
         alt="login form" className='ms-4  ms-md-0' height={"100%"} width="290px" style={{borderRadius: "1rem 0 0 1rem"}} />
      </div>

      <div className='col-sm-11 col-md-7 mt-4'>
      <form className='' onSubmit={handleSubmit}>
      <h1 className='text-center fs-3 fw-bold mb-4'>{isRegister?"Register":"Login"}</h1>
        <div className="mb-3">
        {isRegister &&
        <>
            <div className="mb-3">
            <input
            type="text"
            name="name"
            value={data.name}
            className="form-control"
            placeholder='Enter your Name'
            onChange={handleChange}
            required
          />
          </div>
          <div className="mb-3">
          <input
            type="text"
            name="username"
            value={data.username}
            className="form-control"
            placeholder='Enter your username'
            onChange={handleChange}
            required
          />
          </div>
          </>
        }
        <input
            type="text"
            name="email"
            className="form-control"
            value={data.email}
            placeholder='Enter your Email'
            onChange={handleChange}
            required
          />
          </div>
          <div className="mb-3">
          <input
            type="password"
            name="password"
            value={data.password}
            className="form-control"
            placeholder='Enter your password'
            onChange={handleChange}
            required
          />
          </div>

          {isRegister &&   
           <div className="mb-3">
          <input
            type="password"
            name="confirmpass"
            value={data.confirmpass}
            className="form-control"
            placeholder='Confirm  password'
            onChange={handleChange}
            required
          />
          </div>
          }
          <span style={{display: confirmPassword? 'none': 'block'}}> * confirm password is not same</span>
       
              <div className=" mb-md-5 mb-2 mt-4 d-grid">
                <button type="submit" className="btn btn-primary" disabled = {loading}>
                {loading ? "Loading.." :isRegister ? "Register" : "Login"}
                  </button>
                  <div  className='mt-4'>
               <span className='text-muted fs-6' >{isRegister ? "Already have an account?" : "Don't have an account?"}</span>
               <span className='text-primary fs-5' style={{cursor:"pointer"}} onClick={()=>{setIsRegister((prev)=>!prev);  resetForm()}}>{isRegister ? ` Login` : " Register"}</span>
               </div>
                </div>

              
               
      </form>
  </div>
      </div>
      </div>
      </div>
     
    </div>   
  </div>
)
}


export default Auth