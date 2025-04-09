import Navlink from '@/components/agentManagement/Navlink'
import React from 'react'

const page = () => {
  return (
    <div className='pb-20'>
        <Navlink/>
        <div className="w-full h-[72px] flex justify-between items-center bg-white mt-2 px-[39px] py-[19px] rounded-[15px] border border-[#BBBBBB]">
            <span className="text-[20px] font-semibold text-[#333333]">Amal Kumar</span>
            <div className="flex items-center  gap-4 ">
                <button>
                    <img src="/edit-btn.svg" alt="" />
                </button>
                <button>
                    <img src="/delete-btn.svg" alt="" />
                </button>
            </div>
        </div>
        <div className=' w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]'>
            <div className='w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>Agent - Basic Informations</h1>
                
            </div>
            <div className="flex gap-10 p-8">
        <div className="flex flex-col gap-[10px] text-[16px]  text-black">
        <span className="text-[16px]  text-black">
        Current Location
        </span>
        <span className="text-[16px]  text-black">
        Introduce
        </span>
        <span className="text-[16px]  text-black">
        Full Name
        </span>
        <span className="text-[16px]  text-black">
        Email ID
        </span>
        <span className="text-[16px]  text-black">
        Mobile Number
        </span>
        <span className="text-[16px]  text-black">
        PinCode
        </span>
        <span className="text-[16px]  text-black">
        Address
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


        <div className='w-full mt-2 flex gap-4'>
        <div className=' w-1/2  bg-white rounded-[15px] border border-[#BBBBBB]'>
            <div className='w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>Agent - ID Proof</h1>
                
            </div>
            <div className='p-8'>
            <img src="/agentidproof.png" alt="idproof" />

            </div>
            
        </div>
        <div className=' w-1/2  bg-white rounded-[15px] border border-[#BBBBBB]'>
            <div className='w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px]'>
                <h1 className='text-[16px] font-semibold text-black'>Agent - Photo</h1>
                
            </div>
            <div className='p-8'>
            <img src="/agentphoto.png" alt="photo" />
            </div>
            
        </div>
        </div>

        <div className=' w-full mt-2 mb-10 bg-white rounded-[15px] border border-[#BBBBBB]'>
            <div className='w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px]'>
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