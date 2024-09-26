import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./MainTweet.css"
import Tweet from './Tweet';
const ExploreTweet = () => {
    const [explore, setExplore] = useState(null);
    const {user} = useSelector((state)=>state.authReducer.authData)
    
   
///getting data from tweet route(explore tweet) 
    useEffect(()=>{
        const exploreData = async()=>{
            try {
              const exploreTweets = await axios.get("/api/v1/tweet/explore");
              setExplore(exploreTweets?.data)
               
            } catch (error) {
               console.log(error) 
            }
        }
        exploreData()
    },[user._id])
  return (

    <div className='container mt-2'>
    {explore &&
     explore.map((tweet)=>{
      return (
        <div  className='mb-2' key={tweet._id} >
        <Tweet  data={tweet}  setData= {setExplore} />
      </div>
      )
    })}
                 
    </div>
     

  )
}

export default ExploreTweet