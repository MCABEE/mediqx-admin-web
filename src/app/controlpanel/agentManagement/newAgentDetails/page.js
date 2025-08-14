"use client"
import Navlink from '@/components/agentManagement/Navlink'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter();
  return (
    <div className='pb-20'>
        <Navlink/>
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{ "Agent Name"}</p>
          <div className="flex justify-center items-center gap-[92px]">
            <p></p>
            <p>Doctor</p>
          </div>
        </div>
      </div>
        <div className=' w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]'>
            <div className='w-full h-[52px] flex items-center border-b-1 border-b-[#BBBBBB] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>Agent - Details</h1>
                
            </div>
            <div className="flex gap-16 p-8">
        <div className="flex flex-col gap-[10px] text-[16px]  text-black">
           <span className="text-[16px]  text-black">
        Full Name
        </span>
         <span className="text-[16px]  text-black">
        Gender
        </span>
        <span className="text-[16px]  text-black">
        DOB
        </span>
        <span className="text-[16px]  text-black">
        Current Location (state)
        </span>
        <span className="text-[16px]  text-black">
        District
        </span>
        <span className="text-[16px]  text-black">
        Area / Location
        </span>
        <span className="text-[16px]  text-black">
        Address (As per ID)
        </span>
        <span className="text-[16px]  text-black">
        Email 
        </span>
        <span className="text-[16px]  text-black">
        Phone Number
        </span>
        <span className="text-[16px]  text-black">
        Referral Type
        </span>
        
        </div>
        <div className="flex flex-col gap-[10px] text-[16px]  text-black">
        <span className="text-[16px]  text-black">
        Mysuru, Karnataka
        </span>
        <span className="text-[16px]  text-black">
        healthcare professional
        </span>
        <span className="text-[16px]  text-black">
        Ajith Kumar
        </span>
        <span className="text-[16px]  text-black">
        ajithkumar@gmail.com
        </span>
        <span className="text-[16px]  text-black">
        8086123456
        </span>
        <span className="text-[16px]  text-black">
        654 987
        </span>
        <span className="text-[16px]  text-black">
        215B, Civil Lane
TG Road, RS Puram, Coimbatore
Tamil Nadu
        </span>
        </div>
    </div>
        </div>


      
        <div className='  bg-white rounded-[15px] border border-[#BBBBBB] mt-4' >
            <div className='w-full h-[52px] flex items-center border-b-1 border-b-[#BBBBBB] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>ID Proof</h1>
                
            </div>
            <div className='p-8'>
            <img src="/agentidproof.png" alt="idproof" />

            </div>
            
        </div>
        <div className='  bg-white rounded-[15px] border border-[#BBBBBB] mt-4'>
            <div className='w-full h-[52px] flex items-center border-b-1 border-b-[#BBBBBB] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>Agent - Photo</h1>
                
            </div>
            <div className='p-8'>
            <img src="/agentphoto.png" alt="photo" />
            </div>
            
        </div>
     

        <div className=' w-full mt-2 mb-10 bg-white rounded-[15px] border border-[#BBBBBB]'>
            <div className='w-full h-[52px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>Action</h1>
                
            </div>
            <div className='p-8'>
            <div className="flex gap-8 ">
                
                <button className="w-[192px] h-[40px] bg-[#F93827] text-white flex justify-center items-center rounded-[15px]">Reject</button>
                <button className="w-[192px] h-[40px] bg-[#999999] text-white flex justify-center items-center rounded-[15px]">Modify</button>
                <button className="w-[192px] h-[40px] bg-[#09B438] text-white flex justify-center items-center rounded-[15px]">Approve</button>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default page