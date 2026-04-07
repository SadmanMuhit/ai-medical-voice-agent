"use client";
import { CircleIcon } from "@phosphor-icons/react";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AIDoctorAgents } from "@/shared/list";
import Image from "next/image";

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
  useEffect(() => {
    sessionid && GetSessionDetails();
  }, [sessionid]);
  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionid=" + sessionid);
    console.log(result.data);

    setSessionDetails(result.data);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <CircleIcon className="w-4 h-4" /> Not Connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

     {sessionDetails && 
      <div className="flex items-center flex-col mt-10">
        <Image src={sessionDetails?.selectedDoctor?.image} alt={sessionDetails?.selectedDoctor?.specialist??""}/>
        <h2 className="mt-2">{sessionDetails?.selectedDoctor?.specialist}</h2>
      </div>
     }
    </div>
  );
};

export default MedicalVoiceAgent;
