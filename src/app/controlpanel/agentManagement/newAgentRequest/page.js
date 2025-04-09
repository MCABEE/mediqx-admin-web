import Navlink from '@/components/agentManagement/Navlink'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navlink/>
        <div className='w-full h-[80px] flex items-center bg-white border  border-[#888888] rounded-[15px] mt-2 text-black'>
            <h1 className='text-[32px] font-semibold px-8'>14</h1>
        </div>

        <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2 bg-[#C0D8F6]">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2"> Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2"> Location</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2"> Category</th>

        
          </tr>
        </thead>
        <tbody>
         
              <tr>
                <td className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold" colSpan="5">
                2024 September 01, Sunday
                </td>
              </tr>
             
                <tr  className="bg-white">
                  <td className="p-2">03</td>
                    <Link href={"/controlpanel/agentManagement/newAgentDetails"}>
                  <td className="border-l-4 border-[#C0D8F6] p-2">Pradeep Kumar N</td>
                    </Link>
                  <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
                  <td className="border-l-4 border-[#C0D8F6] p-2">General</td>


                </tr>
         
            
       
        </tbody>
      </table>
    </div>
  )
}

export default page