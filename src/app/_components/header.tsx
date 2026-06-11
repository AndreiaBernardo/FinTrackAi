import Image from "next/image"
import { Inter } from "next/font/google"

import Avatar from "@/assets/Avatar.png"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500", "600"],


})

interface HeaderProps {
    userName: string;
    date: Date;
}


export const Header = ({
    userName,
    date
}: HeaderProps) => {

    const firstName = userName.split(' ')[0]
    const greeting = `Bem vindo de volta, ${firstName}!👏`

    return (
    <header
    className={`${inter.className} flex border-b border-[#1E2938]  bg-[#0F111A] px-8 py-2.5 `}
    >


    <div className="flex flex-col ">
        <div className="font-lg font-bold leading-6 tracking-tight text-[#f1f5f9]">
                {greeting}
        </div>


        <div className="text-xs font-normal leading-4 tracking-tight text-[#94A3B8]">

            {date.toLocaleDateString ('pt-BR',{
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            }).replace(/^\w/, (c) => c.toUpperCase())}
        </div>
        </div>

        <div className="flex flex-1 justify-end">
            <div className="h-10 w-10  overflow-hidden rounded-full bg-[#1E2938] ">

            <Image
            src={Avatar}
            alt="Avatar"
            className="h-10 w-10 object-cover"
            priority
            />
        </div>
        
        </div>
        
    </header>
    
    )
}

        