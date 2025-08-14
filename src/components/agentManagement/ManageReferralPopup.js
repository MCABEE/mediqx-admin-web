import React from 'react'

function ManageReferralPopup({onClose}) {
  return (
    <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs'>
        <div className='w-[640px] bg-white rounded-[15px] py-10 relative'>
            <div className='bg-black text-white size-6 flex justify-center items-center rounded absolute right-4 top-4 cursor-pointer'
            onClick={onClose}
            >
                x
            </div>
            <div className='px-[155px] flex flex-col gap-4'>
<h1 className='text-black font-semibold'>Manage Referral Information</h1>
<h1 className='text-black font-semibold'> Referral Info</h1>

<select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

    <option value="">Type of Referral</option>
</select>
<input type="text" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'placeholder='Full Name' />
<select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

    <option value="">Qualification</option>
</select>
<input type="number" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'placeholder='Phone Number' />

            </div>
             <div className='px-[155px] flex flex-col gap-4 mt-4'>
<h1 className='text-black font-semibold'> Referral Status</h1>

<select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

    <option value="">Confirmed</option>
</select>
<select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

    <option value="">Choose Staff Name (Confirmed)</option>
</select>

        <button className="bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white">Submit</button>

            </div>
        </div>
    </div>
  )
}

export default ManageReferralPopup