'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const MedicalVoiceAgent = () => {
  const {sessionid} = useParams();

  const GetSessionDetails=()=>{
    
  }
  return (
    <div>
     {sessionid}
    </div>
  )
}

export default MedicalVoiceAgent
