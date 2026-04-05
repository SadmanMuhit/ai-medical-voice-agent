
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'

type doctorAgent={
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string
}
type props ={
    doctorAgent: doctorAgent
}
const DoctorAgentCard = ({doctorAgent}: props) => {
  return (
    <div>
      <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} className='w-full h-62.5 object-cover rounded-xl'/>
      <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      <Button className="w-full mt-2 rounded-2xl">Start Consultation</Button>
    </div>
  )
}

export default DoctorAgentCard
