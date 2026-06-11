'use client'

import Image from "next/image"
import IconReceitas from "@/assets/receita.png"
import IconDespesas from "@/assets/despesa.png"
import decorative from "@/assets/decorative.png"


function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export interface BalanceCardProps {
  
  balance: number;
 
  receitas: number;

  despesas: number;
}

export default function BalanceCard({
  balance,
  receitas,
  despesas,
}: BalanceCardProps)  {
  return (
   <section className="relative flex w-full flex-col justify-between gap-2 self-stretch overflow-hidden rounded-3xl bg-[#9333EA] p-8 font-(family-name:--font-inter) shadow-[0px_8px_10px_-6px_rgba(168,65,247,0.27),0px_20px_25px_-5px_rgba(168,65,247,0.24)]"
   aria-label="Resumo do saldo">

    <div className="pointer-events-none absolute rounded-full bg-white/10 w-64 h-64 top-11 right-[-80px]"
   
    aria-hidden
    />

    <div className="pointer-events-none absolute rounded-full bg-white/5 w-48 h-48 top-[-48px] left-[-48px]"
   
    aria-hidden/>

    <div className="relative flex flex-row items-start justify-between gap-4">
      <div className="flex flex-col gap-1">

        <p className="text-sm font-medium leading-5 text-[#f3e8ff]">
          Saldo total
          </p>

          <p className="text-[2.5rem] font-bold leading-none tracking-tight text-white">
            {formatBRL(balance)}
          </p>

          </div>

          <div className="flex shring-0 items-center justify-center rounded-2xl bg-white/20 p-3 pb-3.5 pt-3 backdrop-blur-md">

            <Image
            src={decorative}
            alt=""
            width={54}
            height={63}
            className="h-11 w-9 object-contain"
            />


          </div>
    </div>

    
    <div className="mt-6 border-t border-white/20 pt-6"

    />

   
    <div className="flex flex-row flex-wrap items-stretch justify-stretch">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
       
        <div className="flex flex-row items-center gap-2">
          <Image
          src={IconReceitas}
          alt=""
          />
          
          <span className="text-sm font-normal leading-[1.33] text-[#f3e8ff]">
            Receitas
          </span>

        </div>
         
         <p className="text-xl font-semibold leading-[1.4] text-white">
          {formatBRL(receitas)}
          </p>

      </div>

      
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        
        <div className="flex flex-row items-center gap-2">
          <Image
          src={IconDespesas}
          alt=""
          />
         
          <span className="text-sm font-normal leading-[1.33] text-[#f3e8ff]">
            Despesas
          </span>

        </div>

        <p className="text-xl font-semibold leading-[1.4] text-white">
          {formatBRL(despesas)}
          </p>

      </div>

    </div>
    
   </section>
  )
} 
