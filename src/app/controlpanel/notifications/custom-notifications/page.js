import Navlink from '@/components/notifications/Navlink'
import React from 'react'

function page() {
  return (
    <div>
        <Navlink/>
           <div className="w-full border border-[#cbc7c7] rounded-[15px] p-[22px] text-black mt-2 bg-white">
        <p className="text-[14px] pb-[15px] font-semibold ">
          Select Target Audience
        </p>
        <div className="grid grid-cols-3 gap-7">
          <div className="flex  items-center gap-2">
            <input type="checkbox" name="" id="" className="size-[20px] " />
            <span>All Staff</span>
          </div>
          <div className="flex  items-center gap-2">
            <input type="checkbox" name="" id="" className="size-[20px] " />
            <span>All Staff</span>
          </div>
          <div className="flex  items-center gap-2">
            <input type="checkbox" name="" id="" className="size-[20px] " />
            <span>All Staff</span>
          </div>
          <div className="flex  items-center gap-2">
            <input type="checkbox" name="" id="" className="size-[20px] " />
            <span>All Staff</span>
          </div>
        </div>
        <button className="w-[328px] h-[40px] bg-[#3674B5] rounded-[15px] text-white text-[14px] font-semibold mt-[43px]  ">
          Next
        </button>
      </div>
      <div className="w-full bg-white rounded-2xl  mt-2 border border-[#cbc7c7]">
        <p className="text-[16px] font-semibold px-[36px] py-[29px] ">
          86 Matches found
        </p>
      </div>

      <div className="w-full border border-[#d3cdcd] bg-white mt-2 rounded-2xl pb-10 mb-12">
        <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
          Compose Notification Message
        </p>

        <div className="px-5 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Headline"
            className="w-full h-[40px]  text-[15px] border border-[#BBBBBB] px-8 py-2 rounded-[15px] outline-none"
          />
          <textarea
            name=""
            id=""
            placeholder="Write here ..."
            className="w-full h-[144px]  text-[15px] border border-[#BBBBBB] px-8 py-2 rounded-[15px] outline-none"
          ></textarea>
        </div>
        <div className="flex justify-end px-4 ">
          <button className="w-[328px] h-[40px] bg-[#3674B5] rounded-[15px] text-white text-[14px] font-semibold mt-[43px] flex justify-center items-center ">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default page