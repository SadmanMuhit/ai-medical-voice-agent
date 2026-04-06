'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const MedicalVoiceAgent = () => {
  const {sessionid} = useParams();

  useEffect(()=>{
    sessionid&&GetSessionDetails();
  },[sessionid])
  const GetSessionDetails= async ()=>{
    const result = await axios.get('/api/session-chat?sessionid='+sessionid);
    console.log(result.data);
    
  }
  return (
    <div>
     {sessionid}
    </div>
  )
}

export default MedicalVoiceAgent
