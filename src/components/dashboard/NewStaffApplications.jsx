import React from 'react'

const NewStaffApplications = () => {
  return (
    <div className='bg-white py-[29px] w-1/2 rounded-2xl'>
           <div className='px-[71px] w-full flex justify-between  border-b border-[#888888] '>
     <div className='flex flex-col gap-5 text-[#333333] font-semibold'>
      <p className='text-base'>New Staff Applications</p>
      <p className='text-[32px]'>14</p>
      </div>

      </div>
      <div className='ps-[71px] pe-6 pt-6 flex gap-[64px] font-semibold'>
      <div className='flex flex-col text-[#333333] gap-3.5'>
      <p className='text-base'>This Month (Total)</p>
      <p className='text-[32px]'>36</p>
      </div>
      <div className='flex flex-col gap-3.5 text-[#09B438]'>
      <p className='text-base'>Approved</p>
      <p className='text-[32px]'>15</p>
      </div>
   
    
    </div>
    </div>
  )
}

export default NewStaffApplications