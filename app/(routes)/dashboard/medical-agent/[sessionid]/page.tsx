"use client";
import { CircleIcon, PhoneCallIcon } from "@phosphor-icons/react";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AIDoctorAgents } from "@/shared/list";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';
import { FiPhoneOff } from "react-icons/fi";
type AIDoctorAgent = (typeof AIDoctorAgents)[number];

type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: AIDoctorAgent;
  createdOn: string;
};

const MedicalVoiceAgent = () => {
  const { sessionid } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const [callStarted, setCallStarted] =useState(false);
  const [vapiInstance, setVapiInstance] =useState<any>();
  const [currentRoll, setCurrentRoll] =useState<string>();
  const [liveTranscript, setLiveTranscript] =useState<string>();
  useEffect(() => {
    sessionid && GetSessionDetails();
  }, [sessionid]);
  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionid=" + sessionid);
    console.log(result.data);

    setSessionDetails(result.data);
  }

  const StartCall=()=>{
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
      vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
      setVapiInstance(vapi);
      vapi.on('call-start', () => {console.log('Call started')
        setCallStarted(true);
      });
      vapi.on('call-end', () => {
        setCallStarted(false);
        console.log('Call ended')});
      vapi.on('message', (message) => {
  if (message.type === 'transcript') {
    const {role, transcriptType,transcript} = message;
    console.log(`${message.role}: ${message.transcript}`);
  }
});


    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRoll('assistant')
    });
    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRoll('user')
    });
  }

  const endCall = () => {
    if (vapiInstance) return;
    vapiInstance.stop();

    vapiInstance.off('call-start');
    vapiInstance.off('call-end');
    vapiInstance.off('message');

    setCallStarted(false);
    setVapiInstance(null);
  };
  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <CircleIcon className={`w-4 h-4 rounded-full ${callStarted?"bg-green-500":"bg-red-500"}`} />{callStarted?'Connected...':'Not Connected'} 
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

     {sessionDetails && 
      <div className="flex items-center flex-col mt-10">
        <Image src={sessionDetails?.selectedDoctor?.image} alt={sessionDetails?.selectedDoctor?.specialist??""} width={120} height={120}
        className="h-25 w-25 object-cover rounded-full"/>
        <h2 className="mt-2 text-lg">{sessionDetails?.selectedDoctor?.specialist}</h2>
        <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

        <div className="mt-32">
          <h2 className="text-gray-400">Assistant Msg</h2>
          <h2 className="text-lg">User Msg</h2>
        </div>

        {!callStarted ? <Button className="mt-20" onClick={StartCall}><PhoneCallIcon/>Start Call</Button>
      : <Button variant={'destructive'} onClick={endCall}><FiPhoneOff />Disconnect</Button>  
      }
      </div>
     }
    </div>
  );
};

export default MedicalVoiceAgent;
