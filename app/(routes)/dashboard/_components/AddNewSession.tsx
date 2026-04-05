'use client'
import React, { useState } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog" 
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
function AddNewSession() {
  const [note, setNote]=useState<string>();
  return (
   <Dialog>
  <DialogTrigger><Button className="mt-3">+ Start a Consultation</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription>
        <div>
          <h2>Add Symptoms or Any Other Details</h2>
          <Textarea placeholder='add details here...' className='h-50 mt-1' onChange={(e)=>setNote(e.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant={'outline'}>Cancel</Button></DialogClose>  
      <Button disabled={!note}>Next <FaLongArrowAltRight /></Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddNewSession
