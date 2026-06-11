'use client'

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

import Image from "next/image"
import lagoutIcon from "@/assets/logout.png"



export const Logout = () =>{

//DESAUTENTICAR O USUARIO

async function handleLogout(){
    await authClient.signOut()
    router.push('/')
}

const router = useRouter()





    return(
        <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#94a3b8]"
        onClick={handleLogout}>
            <Image src={lagoutIcon} alt=""/>
            <span className="text-base font-medium leading-normal text-center">
                Sair
            </span>
        </button>
    )
    
}