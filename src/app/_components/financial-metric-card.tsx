import Image from "next/image"

import economia from "@/assets/economia.png"



export const FinancialMetricCard = () => {
    return (
    <div className="flex flex-col items-center bg-[#161b26] rounded-2xl py-6 px-4 justify-center">

        <div className="mb-4 py-5 px-4 bg-[#10b981]/20 rounded-full ">
           <Image
        src={economia}
        alt="economia"
        />  
        </div>

        <h4 className="text-lg font-bold mb-2">Economia do mês</h4>

        <p className="text-xl font-bold text-[#10b981] mb-2">+12%</p>

        <p className="text-center text-xs text-[#64748B]">Você economizou R$ 120,00 a mais que no mês
        passado.</p>
    </div>
  )
}