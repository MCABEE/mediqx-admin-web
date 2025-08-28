// import React from "react";

// function EditPopup({ onClose, heading, value, onChange, onUpdate }) {
//   return (
//     <div className="fixed inset-0 h-full w-full bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center">
//       <div className="bg-[#F0F4F9] w-[320px] rounded-[24px]">
//         <div className="flex items-center justify-between border-b-1 border-[#D7D7D7] py-6 px-6">
//           <h1 className="text-black font-semibold text-[20px]">Edit</h1>
//           <button
//             className="bg-black rounded size-6 text-white text-xs cursor-pointer hover:bg-[#00000090]"
//             onClick={onClose}
//           >
//             X
//           </button>
//         </div>

//         <div className="px-6">
//           <h1 className="text-black font-semibold text-[20px] py-3">{heading}</h1>
//           <input
//             type="text"
//             className="text-base px-4 rounded-[15px] w-full h-[40px] border border-[#BBBBBB] bg-white outline-none"
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//           />
//           <button
//             className="w-full bg-[#196BA5] text-white rounded-[15px] h-[40px] mt-4 mb-8 cursor-pointer"
//             onClick={onUpdate}
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditPopup;





// import React, { useState } from "react";

// function EditPopup({ onClose, heading, value, onChange, onUpdate }) {
//   const [formError, setFormError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!value.trim()) {
//       setFormError("Language is required");
//       return;
//     }
//     setFormError("");
//     onUpdate();
//   };

//   return (
//     <div className="fixed inset-0 h-full w-full bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center">
//       <div className="bg-[#F0F4F9] w-[320px] rounded-[24px]">
//         <form onSubmit={handleSubmit}>
//           <div className="flex items-center justify-between border-b-1 border-[#D7D7D7] py-6 px-6">
//             <h1 className="text-black font-semibold text-[20px]">Edit</h1>
//             <button
//               type="button"
//               className="bg-black rounded size-6 text-white text-xs cursor-pointer hover:bg-[#00000090]"
//               onClick={onClose}
//             >
//               X
//             </button>
//           </div>

//           <div className="px-6">
//             <h1 className="text-black font-semibold text-[20px] py-3">
//               {heading}
//             </h1>
//             <input
//               type="text"
//               className="text-base px-4 rounded-[15px] w-full h-[40px] border border-[#BBBBBB] bg-white outline-none"
//               value={value}
//               onChange={(e) => onChange(e.target.value)}
              
//             />
//             {formError && (
//               <p className="text-red-500 text-sm mt-1">{formError}</p>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-[#196BA5] text-white rounded-[15px] h-[40px] mt-4 mb-8 cursor-pointer"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditPopup;



// "use client"
// import React, { useState } from "react";
// function EditPopup({ onClose, heading, value, onChange, onUpdate, apiError }) {
//   const [formError, setFormError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!value.trim()) {
//       setFormError("Language is required");
//       return;
//     }
//     setFormError("");
//     onUpdate();
//   };

//   return (
//     <div className="fixed inset-0 h-full w-full bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center">
//       <div className="bg-[#F0F4F9] w-[320px] rounded-[24px]">
//         <form onSubmit={handleSubmit}>
//           <div className="flex items-center justify-between border-b-1 border-[#D7D7D7] py-6 px-6">
//             <h1 className="text-black font-semibold text-[20px]">Edit</h1>
//             <button
//               type="button"
//               className="bg-black rounded size-6 text-white text-xs cursor-pointer hover:bg-[#00000090]"
//               onClick={onClose}
//             >
//               X
//             </button>
//           </div>

//           <div className="px-6">
//             <h1 className="text-black font-semibold text-[20px] py-3">{heading}</h1>
//             <input
//               type="text"
//               className="text-base px-4 rounded-[15px] w-full h-[40px] border border-[#BBBBBB] bg-white outline-none"
//               value={value}
//               onChange={(e) => onChange(e.target.value)}
//             />
//             {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}
//             {apiError && <p className="text-red-600 text-sm mt-1">{apiError}</p>}
//             <button
//               type="submit"
//               className="w-full bg-[#196BA5] text-white rounded-[15px] h-[40px] mt-4 mb-8 cursor-pointer"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditPopup;



import React, { useState } from "react";

function EditPopup({ onClose, heading, value, onChange, onUpdate, apiError }) {
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setFormError("Language is required");
      return;
    }
    setFormError("");
    onUpdate();
  };

  return (
    <div className="fixed inset-0 h-full w-full bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#F0F4F9] w-[320px] rounded-[24px]">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between border-b-1 border-[#D7D7D7] py-6 px-6">
            <h1 className="text-black font-semibold text-[20px]">Edit</h1>
            <button
              type="button"
              className="bg-black rounded size-6 text-white text-xs cursor-pointer hover:bg-[#00000090]"
              onClick={onClose}
            >
              X
            </button>
          </div>

          <div className="px-6">
            <h1 className="text-black font-semibold text-[20px] py-3">
              {heading}
            </h1>
            <input
              type="text"
              className="text-base px-4 rounded-[15px] w-full h-[40px] border border-[#BBBBBB] bg-white outline-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {/* Form validation error */}
            {formError && (
              <p className="text-red-500 text-sm mt-1">{formError}</p>
            )}
            {/* API error */}
            {apiError && !formError && (
              <p className="text-red-600 text-sm mt-1">{apiError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#196BA5] text-white rounded-[15px] h-[40px] mt-4 mb-8 cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPopup;
