import React from 'react'
import { IoMdPower } from "react-icons/io";


const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center px-[66px] mb-9  bg-white'>
        <img src="/logo.svg" alt=""  className='pt-[22px] pb-[11px] w-[200px] h-[65px] '/>
      <div className='flex gap-4 items-center'>
        <img src="/profile.svg" alt="" />
      <p className='text-base text-[#333333]'>Administrator</p>
      <IoMdPower className='size-4 text-[#333333]'/>
      </div>

         
    </div>
  )
}

export default Navbar