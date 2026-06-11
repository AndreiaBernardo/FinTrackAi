"use client";

import Link from "next/link";
import Image from "next/image";

import { Inter } from "next/font/google";


import logo from "@/assets/logo.png";
import dashboard from "@/assets/dashboard.png"
import transactions from "@/assets/transactions.png"
import { Logout } from "./logout";






const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500", "700"],
})
    
 
 


export const Sidebar = () => {
  

  return (
    <aside
      className={`${inter.className} flex w-64  flex-col border-r border-[#1E2938] bg-[#0F111A] text-[#f1f5f9]`}
    >
      
      <div className="flex w-3xs items-center gap-3 px-6 py-6 ">
        <div className="bg-[#9333EA] rounded-xl py-4 px-2.5">
          <Image
          src={logo}
          alt="FinTrack"
          priority
        
        />
        </div>
        <p className="text-xl font-bold leading-5 ">

          FinTrack
          </p>
          
       
      </div>

   
    <nav className="flex flex-1 flex-col gap-2 px-4 py-4">
      <Link href="/"
      className="flex w-full items-center gap-3 rounded-xl bg-[#9333EA] px-4 py-3 text-white">
         <Image
                src={dashboard}
                alt=""
              
              />

              <span className="text-base font-medium leading-normal">
                Dashboard
              </span>
      </Link>
      <Link href="/transactions"
      className="flex w-full items-center gap-3 rounded-xl  px-4 py-3 text-[#94a3b8]">
         <Image
                src={transactions}
                alt=""
               
              />

             <span className="text-base font-medium leading-normal">
              Transações
             </span>
               
            
      </Link>

      </nav>

      <div className="border-t border-[#1E2938]  px-6 py-6">
        
          <Logout/>

      </div>

     
     

     
      
        
        
    </aside>
  )
}







 
    