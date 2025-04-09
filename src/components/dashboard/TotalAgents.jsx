




import React from 'react'

const TotalAgents = () => {
  return (
    <div className='bg-white pt-[29px] w-1/2 rounded-2xl'>
           <div className='px-[71px] w-full flex justify-between  border-b border-[#8888888c] '>
     <div className='flex flex-col gap-5 text-[#333333] font-semibold'>
      <p className='text-base'>Total Agents</p>
      <p className='text-[32px]'>85</p>
      </div>

      </div>
      <div className='px-[71px] pt-6 flex gap-[94px] font-semibold'>
      <div className='flex flex-col text-[#333333] gap-3.5'>
      <p className='text-base'>Active Agents</p>
      <p className='text-[32px]'>57</p>
      </div>
    
   
    
    </div>
    </div>
  )
}

export default TotalAgents