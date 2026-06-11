'use client'


import Image from "next/image"

import categoria from "@/assets/categoria.png"
import lampada from "@/assets/lampada.png"
import ia from "@/assets/ia.png"
import atualiza from "@/assets/atualiza.png"
import { TransactionCategory } from "@prisma/client"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

//PARA IA
interface CategorySummary {
    category: TransactionCategory;
    totalAmount: number;
    percentageOfTotal: number;


}

//PARA IA
interface AiInsightsProps {
    month: string
    year: number
    depositsTotal: number
    expensesTotal: number
    investmentsTotal: number
    balance: number
    totalExpensePerCategory: CategorySummary[]

}

//RESPOSTA DA IA DENTRO DO APLICATIVO 
interface AiResponse{
    suggestion: string
    topCategory: string | null 
    topCategoryAmount: string | null

}





export const AiInsights = ({
    month,
    year,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    balance,
    totalExpensePerCategory
    
}: AiInsightsProps) => {

    //PARA IA
    const [loading,setloading ] = useState<boolean>(true)
    const [error, setError] = useState<string | null >(null)
    const [suggestion, setSuggestion] = useState<string | null>(null)
    const [topCategory, setTopCategory] = useState<string | null>(null)
    const [topCategoryAmount, setTopCategoryAmount] = useState<string | null>(null)

    //CHAMADA PARA A IA
    const fetchAiInsights = async () => {
        setloading(true)
        setError(null)

        try{
            const response = await fetch('/api/ai-insights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month,
                    year,
                    depositsTotal,
                    expensesTotal,
                    investmentsTotal,
                    balance,
                    totalExpensePerCategory,
                }),
            })

            const data= await response.json()

            if(!response.ok){
                setError(data.error ?? "Erro ao carregar análise.")
                return
            }

            setSuggestion((data as AiResponse).suggestion ?? null)

            setTopCategory((data as AiResponse).topCategory ?? null)

            setTopCategoryAmount((data as AiResponse).topCategoryAmount ?? null)

        }catch(error){
            setError("Erro ao carregar.Tente de novo")

        }
        finally{
            setloading(false)
        }
    }



   useEffect(() => {
     void fetchAiInsights ()
  }, [])



    return (
    <div className="space-y-6">
        <div className="mb-3 flex gap-3">
            <Image
            src={ia}
            alt=""
            className="flex flex-row  object-contain"
            />
            <h3 className="text-[28px] font-bold">Insights com IA</h3>
        </div>

         {loading ? (
                <div className="bg-[#161b26] p-8 rounded-2xl border border-[#1d293d] flex flex-col items-center justify-center gap-4 min-h-[200px]">
                    <Loader2
                        className="h-10 w-10 animate-spin text-violet-500"
                        aria-hidden
                    />
                    <p className="text-sm text-slate-400">
                        Analisando seus dados do mês…
                    </p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                    <p className="text-sm text-red-400">{error}</p>
                    <button
                        type="button"
                        onClick={fetchAiInsights}
                        className="mt-3 text-sm font-medium text-violet-400 hover:text-violet-300"
                    >
                        Tentar novamente
                    </button>
                </div>
            ) : (
                <>


        {topCategory && topCategoryAmount &&(
        <div className="bg-[#161B26] rounded-xl p-6  flex items-center gap-4 ">
            <div className="bg-[#a855f7]/20  p-4 rounded-xl w-12 h-14 ">
                <Image
            src={categoria}
            alt="categoria"
           className="w-6 h-6 object-contain"
            /></div>
            
            <div>
                <p className="text-xl font-bold mb-2">Categoria com maior gasto</p>
                <p className="text-[#94a3b8] text-sm">
                   {topCategory}: {topCategoryAmount}
                    
                     </p>
            </div>
        </div>
        )}
        
        {suggestion &&(
        <div className="bg-[#10B981]/5 p-6 rounded-xl  flex  items-center gap-4 ">
            <div className="bg-[#10B981]/20 px-4 py-3.5 rounded-xl w-16 h-14 ">
                <Image
            src={lampada}
            alt="lampada"
            className=" w-6 h-6 object-contain"
            />
            </div>
            
            <div>
                <p className="text-xl font-bold mb-2">Sugestão de economia</p>
                <div>
                    <p className="text-[#CBD5E1] text-sm">{suggestion}</p>
                </div>
                
            </div>
        </div>
        )}
        </>
            )}

                 {!suggestion && !topCategory && !loading && !error && (
                <div className="bg-[#161b26] p-6 rounded-2xl border border-[#1d293d] text-center text-slate-400 text-sm">
                    Adicione transações no mês para receber sugestões da IA.
                </div>
            )}


        <button className="border-dashed border-2 border-[#94a3b8] rounded-2xl p-6  flex w-full items-center justify-center gap-2 hover:border-[#9333ea] cursor-pointer  "
        onClick={fetchAiInsights}>
           
                <Image
            src={atualiza}
            alt=""
            className="w-6 h-6 object-contain flex gap-4"
            /> 
          
                       
                 <span className="text-[#94a3b8] font-medium text-xl hover:text-[#9333ea]">Atualizar análise</span>

        </button>

    </div>
  )

}