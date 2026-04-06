"use client";

import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface Doctor {
  name: string;
  specialty: string;
}

function AddNewSession() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<Doctor[]>([]);

  const handleNext = async () => {
    if (!note) return;
    try {
      setLoading(true);
      const { data } = await axios.post<Doctor[]>("/api/session-doctor", {
        notes: note,
      });
      setSuggestedDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription>
            <Textarea
              placeholder="Add symptoms or any details..."
              className="h-40 mt-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between">
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleNext} disabled={!note || loading}>
            {loading ? "Loading..." : "Next"}
            <FaLongArrowAltRight className="ml-2" />
          </Button>
        </DialogFooter>

        {/* Render doctors below footer, not inside it */}
        {suggestedDoctors.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4">
            {suggestedDoctors.map((doc, idx) => (
              <div key={idx} className="p-4 border rounded-xl">
                <h2 className="font-semibold">{doc.name}</h2>
                <p className="text-sm text-gray-600">{doc.specialty}</p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSession;
