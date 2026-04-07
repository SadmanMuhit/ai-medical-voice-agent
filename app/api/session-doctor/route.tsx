import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  const text = notes.toLowerCase();

  let doctors = [];

  if (text.includes("headache")) {
    doctors.push({
      name: "Dr. John Smith",
      specialty: "Neurologist",
      image: "/doctor1.png",
    });
  }

  if (text.includes("heart")) {
    doctors.push({
      name: "Dr. Sarah Lee",
      specialty: "Cardiologist",
      image: "/doctor2.png",
    });
  }

  if (doctors.length === 0) {
    doctors.push({
      name: "Dr. General Physician",
      specialty: "General Medicine",
      image: "/doctor.png",
    });
  }

  return NextResponse.json(doctors);
}