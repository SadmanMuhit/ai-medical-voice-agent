"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Doctor = {
  name: string;
  specialty: string;
  image: string;
};

export default function AddNewSession() {
  const [note, setNote] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  const getDoctors = async () => {
    const { data } = await axios.post("/api/session-doctor", {
      notes: note,
    });
    setDoctors(data);
  };

  const startConsultation = async () => {
    const { data } = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor, // ✅ full object
    });

    router.push(`/dashboard/medical-agent/${data.sessionId}`);
  };

  return (
    <div className="p-5">
      <Textarea
        placeholder="Enter symptoms..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button onClick={getDoctors} className="mt-3">
        Next
      </Button>

      <div className="grid grid-cols-2 gap-3 mt-5">
        {doctors.map((doc, i) => (
          <div
            key={i}
            onClick={() => setSelectedDoctor(doc)}
            className="p-3 border rounded cursor-pointer"
          >
            <h2>{doc.name}</h2>
            <p>{doc.specialty}</p>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <Button onClick={startConsultation} className="mt-4 w-full">
          Start Consultation
        </Button>
      )}
    </div>
  );
}