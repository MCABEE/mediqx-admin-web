import Navlink from '@/components/staffManagement/Navlink'
import React from 'react'

function page() {
  return (
    <div>
        <Navlink/>

        <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 pb-4 rounded-[15px] mt-4">
        <span>Add New Staff</span>

        {/* <span className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4">
          Referral
        </span> */}
      </div>




      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">


<div className="px-[39px] pt-[15px]">
    <h1 className="text-[16px] font-semibold text-black pb-[18px]">Basics</h1>
    <div className="flex flex-col gap-5">
 <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Current Location</option>
 </select>
 <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Qualification</option>
 </select>
 <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Looking for (Fulltime / Part Time)</option>
 </select>
    </div>

    <h1 className="text-[16px] font-semibold text-black py-[18px]">Available Time Schedules</h1>
    <div className="flex gap-x-[20px]">
        <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>

        </div>
        <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
            <span className="flex gap-4">
                <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
            </span>
            <span className="flex gap-4">
                <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
            </span>
            <span className="flex gap-4">
                <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
            </span>
            <span className="flex gap-4">
                <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
            </span>
            <span className="flex gap-4">
                <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
            </span>
            <span className="flex gap-4">
                <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
            </span>
            <span className="flex gap-4">
                <img src="/not-available-btn.svg" alt="" /> <span className="text-[#FE1940] text-[16px]">NA</span>
            </span>

        </div>
        <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] ps-8">
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]"></span>

        </div>
        <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] ps-8">
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 PM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
            <span className="border-b-[1px] border-b-[#BBBBBB]"></span>

        </div>
    </div>


        <h1 className="text-[16px] font-semibold text-black py-[18px]">Do you have Work Experience?</h1>
    <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
           
    <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Previous Work Experience</option>
 </select>
        </div>




        <h1 className="text-[16px] font-semibold text-black py-[18px]">Please provide your experience details</h1>
    <div className="flex flex-col gap-5">
 <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Total Experience in years</option>
 </select>
 <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Hospital (Last working)</option>
 </select>
 <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2'>
    <option value="Current Location" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none'>Department / Specialty</option>
 </select>
    </div>




        <h1 className="text-[16px] font-semibold text-black py-[18px]">Mention your Expertise / Skills</h1>
                <div className='flex gap-10'>
                <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
        <span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Emergency & Trauma (Casualty)</span>
            </span>
            <span className="flex gap-[5px]  items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Obstetrics & Gynecology (OB/GYN)</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Intensive Care Unit (ICU)</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Cardiology</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Orthopedics</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Psychiatry & Mental Health</span>
            </span>
            

        </div>

        <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
        <span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Emergency & Trauma (Casualty)</span>
            </span>
            <span className="flex gap-[5px]  items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Obstetrics & Gynecology (OB/GYN)</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Intensive Care Unit (ICU)</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Cardiology</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Orthopedics</span>
            </span><span className="flex gap-[5px] items-center">
                <input type="checkbox" className='size-[20px]' /><span className="text-[16px]">Psychiatry & Mental Health</span>
            </span>
            

        </div>
                </div>

        </div>

        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Upload your Registration / Experience Certificates</h1>
    <div className="flex flex-col gap-5 px-[39px]">
 
        <label for="cv-upload" className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer">
  Upload CV <img src="/upload-btn.svg" alt="" />
  <input type="file" id="cv-upload" className="hidden" />
</label>
<label for="cv-upload" className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer">
Council Registration <img src="/upload-btn.svg" alt="" />
  <input type="file" id="cv-upload" className="hidden" />
</label>
<label for="cv-upload" className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer">
Experience Certificates <img src="/upload-btn.svg" alt="" />
  <input type="file" id="cv-upload" className="hidden" />
</label>
<label for="cv-upload" className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer">
Photo  <img src="/upload-btn.svg" alt="" />
  <input type="file" id="cv-upload" className="hidden" />
</label>

    </div>



    <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Contact Details</h1>
    <div className="flex flex-col gap-5 px-[39px] mb-12">
    <select name="" id="" className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2 ps-8'>
    <option value="" selected disabled className='w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none ps-8'>Gender</option>
 </select>
 
<input type="text"
className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
placeholder='Full Name'
/>
<input type="email"
className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
placeholder='Email ID'
/>
<input type="number"
className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
placeholder='Phone Number'
/>

<textarea className="w-[328px] h-[89px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 pt-2 "
placeholder='Address'></textarea>
<input type="number"
className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
placeholder='Pin Code'
/>
<input type="number"
className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
placeholder='Referral Code '
/>

<button className='w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center'>Upload</button>
     
<span className=' text-[14px] text-[#3674B5] font-semibold ps-4 '>The Entry has been successfully submitted !</span>
</div>
   


      </div>



    </div>
  )
}

export default page