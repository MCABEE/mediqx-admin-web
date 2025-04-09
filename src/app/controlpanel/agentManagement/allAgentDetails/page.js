import Navlink from '@/components/agentManagement/Navlink'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navlink/>
        <div className="w-full h-[72px] flex justify-between items-center bg-white mt-2 px-[39px] py-[19px] rounded-[15px] border border-[#BBBBBB]">
            <span className="text-[20px] font-semibold text-[#333333]">Amal Kumar</span>
            <div className="flex items-center  gap-4 ">
                <button className='w-[192px] h-[40px] text-white text-[16px] font-semibold bg-[#3674B5] rounded-[15px]'>
                View Referrals
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

        <table className="w-full border-spacing-y-2 border-separate text-black">
                      
                        <tbody>
                         
                              <tr>
                                <td className="rounded-tl-2xl p-2 px-8  bg-[#C0D8F6] text-[16px] font-semibold " colSpan="4">
                               <span> Patient Referrals</span> 
                                </td>
                                <td className="rounded-tr-2xl p-2 px-8  bg-[#C0D8F6] text-[16px] font-semibold " colSpan="1">
                               <span className='text-right'>03</span>
                                </td>
                              </tr>

                              <tr  className="bg-[#C0D8F6]">
                                  <td className="text-base font-bold  border-[#F0F4F9] rounded-l-2xl p-2 ">No</td>
                                  
                                  <td className="text-base font-bold border-l-4 border-[#F0F4F9] p-2">Patient Name</td>
                                  <td className="text-base font-bold border-l-4 border-[#F0F4F9] p-2">Location</td>
                                    
                                  <td className="text-base font-bold border-l-4 border-[#F0F4F9] p-2">Date of Referral</td>
                                  <td className="text-base font-bold border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Status</td>
                
                
                                </tr>
                             
                                <tr  className="bg-white">
                                  <td className="p-2">03</td>
                                  
                                  <td className="border-l-4 border-[#C0D8F6] p-2">Pradeep Kumar N</td>
                                    
                                  <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
                                  <td className="border-l-4 border-[#C0D8F6] p-2">April 04</td>

                                  <td className="border-l-4 border-[#C0D8F6] p-2">
                                  <img src="/tick.svg" alt="" />

                                  </td>
                
                
                                </tr>
                                <tr  className="bg-white">
                                  <td className="p-2">02</td>
                                  
                                  <td className="border-l-4 border-[#C0D8F6] p-2">Pradeep Kumar N</td>
                                    
                                  <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
                                  <td className="border-l-4 border-[#C0D8F6] p-2">April 04</td>

                                  <td className="border-l-4 border-[#C0D8F6] p-2">
                                  <img src="/cross.svg" alt="" />

                                  </td>
                
                
                                </tr>
                                <tr  className="bg-white">
                                  <td className="p-2">01</td>
                                  
                                  <td className="border-l-4 border-[#C0D8F6] p-2">Pradeep Kumar N</td>
                                    
                                  <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
                                  <td className="border-l-4 border-[#C0D8F6] p-2">April 04</td>

                                  <td className="border-l-4 border-[#C0D8F6] p-2">
                                  <img src="/tick.svg" alt="" />

                                  </td>
                
                
                                </tr>
                         
                            
                       
                        </tbody>
                      </table>
                      <table className="w-full border-spacing-y-2 border-separate text-black mb-[200px]">
                      
                      <tbody>
                       
                      <tr>
                                <td className="rounded-tl-2xl p-2 px-8  bg-[#C0D8F6] text-[16px] font-semibold " colSpan="4">
                               <span> Staff Referrals</span> 
                                </td>
                                <td className="rounded-tr-2xl p-2 px-8  bg-[#C0D8F6] text-[16px] font-semibold " colSpan="1">
                               <span className='text-right'>03</span>
                                </td>
                              </tr>

                            

                            <tr  className="bg-[#C0D8F6]">
                                <td className="text-base font-bold  border-[#F0F4F9] rounded-l-2xl p-2 ">No</td>
                                
                                <td className="text-base font-bold border-l-4 border-[#F0F4F9] p-2">Staff Name</td>
                                <td className="text-base font-bold border-l-4 border-[#F0F4F9] p-2">Qualification</td>
                                  
                                <td className="text-base font-bold border-l-4 border-[#F0F4F9] p-2">Date of Referral</td>
                                <td className="text-base font-bold border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Status</td>
              
              
                              </tr>
                           
                              <tr  className="bg-white">
                                <td className="p-2">03</td>
                                
                                <td className="border-l-4 border-[#C0D8F6] p-2">Pradeep Kumar N</td>
                                  
                                <td className="border-l-4 border-[#C0D8F6] p-2">Bsc Nurse</td>
                                <td className="border-l-4 border-[#C0D8F6] p-2">April 04</td>

                                <td className="border-l-4 border-[#C0D8F6] p-2">
                                  <img src="/tick.svg" alt="" />
                                </td>
              
              
                              </tr>
                       
                          
                     
                      </tbody>
                    </table>
    </div>
  )
}

export default page