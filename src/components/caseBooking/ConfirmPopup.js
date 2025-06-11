import React from "react";
import { PiMapPinLineFill } from "react-icons/pi"

const ConfirmPopup = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-[#c1bfbfa9] backdrop-blur-xs z-50 flex justify-center items-center">
      <div className="bg-white rounded-[15px]  w-[800px]">
        <div className="bg-[#3674B5] p-[26px] rounded-t-[15px]">
            <div className="flex justify-end">
                <div onClick={onClose}  className="size-6 bg-white flex justify-center items-center hover:bg-[#ff7b7be4] cursor-pointer">
                    <p className="rotate-45 text-2xl text-[#3674B5]">+</p>
                </div>
            </div>
            <h1 className="text-center text-white text-[20px] font-semibold">Add Duty Details</h1>

        </div>
        <h2 className="text-xl text-center font-semibold text-[#333333] py-6 border-b-[1px] border-b-[#BBBBBB]">Pradeep Kumar N</h2>
            <div className="px-[140px] h-[450px] overflow-hidden overflow-y-scroll mb-4">
               <div>
                 <h3 className="text-xl  font-semibold text-[#333333] mt-4 mb-2">Assigned Duty</h3>
                    <textarea name="" id=""   className="border-[1px] border-[#BBBBBB] w-full h-[140px] rounded-[10px] p-3 outline-none"></textarea>
               </div>
               <div>
                 <h3 className="text-xl  font-semibold text-[#333333] mt-4 mb-2">Equipment's / Materials Required</h3>
                    <textarea name="" id=""   className="border-[1px] border-[#BBBBBB] w-full h-[140px] rounded-[10px] p-3 outline-none"></textarea>
               </div>
               <div>
                 <h3 className="text-xl  font-semibold text-[#333333] mt-4 mb-2">Remarks</h3>
                    <textarea name="" id=""   className="border-[1px] border-[#BBBBBB] w-full h-[140px] rounded-[10px] p-3 outline-none"></textarea>
               </div>
               <div>
                 <h3 className="text-xl  font-semibold text-[#333333] mt-4 mb-2">Location</h3>
                    <textarea name="" id=""   className="border-[1px] border-[#BBBBBB] w-full h-[140px] rounded-[10px] p-3 outline-none"></textarea>
               </div>
                <div className="flex items-center gap-10 mt-6">
                 <label className="text-[16px] text-[#333333]  ">Search Location</label>
                 <PiMapPinLineFill className="text-xl"/>
                 <input type="text" className="flex-1 h-[40px] rounded-[10px] border-[1px] border-[#BBBBBB] px-2 outline-none" />
                 
               </div>
              <div className="flex justify-center items-center mt-8 mb-10">
                 <button className="w-[192px] h-[40px] bg-[#3674B5] text-white rounded-[15px]">
                Submit
               </button>
              </div>
             </div>       
      </div>
    </div>
  );
};

export default ConfirmPopup;
