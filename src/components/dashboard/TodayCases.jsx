import React from 'react'

const TodayCases = () => {
  return (
   <div className=' bg-white py-7 rounded-2xl'>
    <div className=' w-full flex justify-between  border-b border-[#888888]' >
     
      <p className='px-[71px] text-2xl text-[#333333] font-semibold pb-4'>Todays Cases</p>
       
    </div>
    <div className='px-[71px] pt-6 flex gap-[94px] font-semibold'>
      <div className='flex flex-col text-[#333333] gap-3.5'>
      <p className='text-base'>To Start</p>
      <p className='text-[32px]'>420</p>
      </div>
      <div className='flex flex-col text-[#333333] gap-3.5'>
      <p className='text-base'>Ongoing</p>
      <p className='text-[32px]'>420</p>
      </div>
      <div className='flex flex-col text-[#333333] gap-3.5'>
      <p className='text-base'>New</p>
      <p className='text-[32px]'>420</p>
      </div>
    
    </div>
    </div>
  )
}

export default TodayCases