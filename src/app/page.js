
// import Image from "next/image";

// export default function Home() {
// return (
//   <div className="flex flex-col min-h-screen bg-slate-100">
   
//     {/* <Toaster /> */}
//     <main className="flex-grow px-5 md:px-20 md:py-20 flex justify-center">
//       <section className="flex flex-col md:flex-row justify-between items-center px-5 md:px-16 py-12 bg-white rounded-[30px] mx-auto min-w-full">
//         <div className="flex-1 flex justify-center mb-4 md:mb-0">
//           <img
//             loading="lazy"
//             src={"/logo.svg"}
//             alt="Master Control Panel Logo"
//             className="object-contain max-w-full aspect-[0.63] "
//           />
//         </div>
//         <div className="flex-1">
//           <form  className="flex flex-col w-full max-w-md mx-auto">
//             <h2 className="text-2xl md:text-3xl leading-10 text-zinc-800 text-left mb-6 font-semibold">
//               Master <br /> Control Panel
//             </h2>
//             <div className="flex flex-col gap-5 mt-3">
//               <label htmlFor="username" className="sr-only">Username</label>
//               <input
//                 id="username"
//                 type="text"
//                 className="px-4 py-3.5 w-full bg-white border border-neutral-400 rounded-xl text-[#333333]"
//                 placeholder="Username"
//                 // onChange={(e) => setMail(e.target.value)}
//               />
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 className="px-4 py-3.5 w-full bg-white border border-neutral-400 rounded-xl text-[#333333]"
//                 placeholder="Password"
//                 // onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="flex justify-center md:justify-end mt-5">
//               <button
//                 type="submit"
//                 className="px-10 py-2 text-white rounded-3xl bg-[#3674B5]"
//               >
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//     {/* <Footer /> */}
//   </div>
// );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        
        // Save token in localStorage or cookie
        localStorage.setItem("token", token);
        // or use cookies:
        // document.cookie = `token=${token}; path=/`;

        console.log("Login successful", token);
        router.push("/dashboard"); // Redirect to a protected route
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <main className="flex-grow px-5 md:px-20 md:py-20 flex justify-center">
        <section className="flex flex-col md:flex-row justify-between items-center px-5 md:px-16 py-12 bg-white rounded-[30px] mx-auto min-w-full">
          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <img
              loading="lazy"
              src={"/logo.svg"}
              alt="Master Control Panel Logo"
              className="object-contain max-w-full aspect-[0.63]"
            />
          </div>
          <div className="flex-1">
            <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl leading-10 text-zinc-800 text-left mb-6 font-semibold">
                Master <br /> Control Panel
              </h2>
              <div className="flex flex-col gap-5 mt-3">
                <input
                  id="username"
                  type="text"
                  className="px-4 py-3.5 w-full bg-white border border-neutral-400 rounded-xl text-[#333333]"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  id="password"
                  type="password"
                  className="px-4 py-3.5 w-full bg-white border border-neutral-400 rounded-xl text-[#333333]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center md:justify-end mt-5">
                <button
                  type="submit"
                  className="px-10 py-2 text-white rounded-3xl bg-[#3674B5]"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
