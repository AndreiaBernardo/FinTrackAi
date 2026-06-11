'use client'

import { useState } from "react"



import Image from "next/image"
import PlusIcon from '@/assets/plus.png'
import Confere from '@/assets/confere.png'

import{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter

} from '@/app/_components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
  } from "@/app/_components/ui/select";


 
  import {useForm, Controller, Resolver} from "react-hook-form"
  import { zodResolver } from "@hookform/resolvers/zod";

 
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../constants/transaction"

import { createTransactionFormSchema, type CreateTransactionFormData } from "../_schemas/transaction"

import { addTransaction } from "../_actions/add-transaction"
import { useRouter } from "next/navigation"







export const AddTransactionButton = () => {
    const [open, setIsOpen] = useState<boolean>(false)

  const router = useRouter()
    

//VALIDAÇÃO
   const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    
   
   } = useForm<CreateTransactionFormData>({
    resolver:zodResolver(createTransactionFormSchema)as unknown as Resolver<CreateTransactionFormData>,
    defaultValues:{
        name:'' as any,
        amount: '' as any,
        type:'' as any,
        category:'' as any,
        paymentMethod:'' as any,
        date: '' as any
    },
    mode:'onBlur'
   })

   
//ENVIA PARA O BANCO DE DADOS
   const onSubmit = async (data: CreateTransactionFormData) => {
        console.log(data)
        
       
        try {
            await addTransaction(data)
            setIsOpen(false)
            reset()
            router.refresh()
        } catch (error) {
            console.error("Erro ao salvar transação:", error)
            alert("Erro ao salvar a transação. Verifique o console.")
        }
    }



    return (
        <section> 
            <Dialog open={open} onOpenChange={setIsOpen} >
                <DialogTrigger asChild >
                    
                <button type="button"
                    className="rounded-sm bg-[#9333EA] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-colors flex items-center gap-2 cursor-pointer">
                        <Image 
                        src={PlusIcon}
                        alt=""
                        />
                        <p>Adicionar</p>

                    </button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#1E293B] text-[#CAD5E2]">
                        <DialogHeader className="p-2">
                            <DialogTitle>Nova transação
                             </DialogTitle>
                                    
                        </DialogHeader>

                    <form className="flex flex-col gap-4 pt-4" onSubmit={handleSubmit(onSubmit)} >
                         <div className="space-y-2 " >
                         
                             <label>Título</label>
                                <input id="name" placeholder="Ex: Almoço, Freelancer..." 
                                {...register('name')}
                                className="w-full border-2 rounded-2xl p-1.5 bg-[#FFFFFF]/10 border-[#FFFFFF]/5 text-[#62748E]"/>

                                {errors.name &&( <p className="text-xs text-red-500"> {errors.name.message} </p>)}
                        </div>

                        <div className=" space-y-2">             
                             <label >Valor</label>

                                <input id="amount"
                                type="number"
                                placeholder="0,00"
                                className="w-full border-2 p-1.5 rounded-2xl bg-[#FFFFFF]/10 border-[#FFFFFF]/5
                                text-[#62748E]"
                                {...register('amount',{valueAsNumber:true})}
                               
                                 />
                                 {errors.amount && (<p className="text-xs text-red-500"> {errors.amount.message} </p>)}
                                </div>
                        <div className=" space-y-2"> 
                            <label >Tipo</label>

                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) =>(
                                    <Select onValueChange = {field.onChange}
                                        value={field.value}>
                                        

                                <SelectTrigger className="w-full rounded-2xl bg-[#FFFFFF]/10 border-[#FFFFFF]/5 ">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>    
                                    {TRANSACTION_TYPE_OPTIONS.map((opt) => (
                                        <SelectItem 
                                        key={opt.value}
                                        value={opt.value} >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                        
                                </SelectContent>
                            </Select> 
                                )
}
                            />

                            {errors.type && (<p className="text-xs text-red-500"> {errors.type.message} </p>)}

                        </div>

                         <div className=" space-y-2 ">
                            <label >Categoria</label>

                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) =>(         
                                    
                            <Select
                                onValueChange = {field.onChange}
                                value={field.value}

                            >
                                <SelectTrigger className="w-full rounded-2xl  bg-[#FFFFFF]/10 border-[#FFFFFF]/5 ">
                                    <SelectValue placeholder="Selecione a categoria"/>
                                </SelectTrigger>
                                <SelectContent>    
                                {TRANSACTION_CATEGORY_OPTIONS.map((opt) => (
                                        <SelectItem 
                                        key={opt.value}
                                        value={opt.value} >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> 
                                )
}
                            />
                                 {errors.category && (<p className="text-xs text-red-500"> {errors.category.message} </p>)}   
                        </div>
                                       
                         <div className=" space-y-2">
                            <label >Método de pagamento</label>

                            <Controller
                                control={control}
                                name="paymentMethod"
                                render={({ field }) =>(
                                    
                            <Select
                            
                                onValueChange = {field.onChange}
                                value={field.value}

                            >
                                <SelectTrigger className="w-full rounded-2xl bg-[#FFFFFF]/10 border-[#FFFFFF]/5 ">
                                    <SelectValue placeholder="Selecione o método"/>
                                </SelectTrigger>
                                <SelectContent>    
                                {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((opt) => (
                                        <SelectItem 
                                        key={opt.value}
                                        value={opt.value} >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> 
                                )
}
                            />
                        {errors.paymentMethod && (<p className="text-xs text-red-500"> {errors.paymentMethod.message} </p>)}
                        </div>

                        <div className=" space-y-2"> 
                            <label htmlFor="">Data</label>
                            <input type="date" id="date" placeholder="__/__/___"
                            className="w-full border-2 p-1.5 rounded-2xl bg-[#FFFFFF]/10 border-[#FFFFFF]/5" 
                            {...register('date')}/>
                            {errors.date && ( <p className="text-xs text-red-500"> {errors.date.message} </p>)}

                        </div>

                        <DialogFooter className="gap-4 bg-[#1E293B] border-none">
                            <button 
                                type="button" 
                                onClick={() => setIsOpen(false)}
                                className="border border-[#FFFFFF]/5 rounded-lg w-1/3 py-2.5"
                            >
                                Cancelar
                                </button>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#8E51FF] rounded-2xl w-2/3 flex items-center justify-center gap-2 font-semibold cursor-poin"
                               
                            >
                                <Image
                                src={Confere}
                                alt=""
                                />
                                <p>
                                    {isSubmitting 
                                    ? 'Salvando...'
                                    : 'Salvar transação'}
                                    </p>
                            </button>
                            </DialogFooter>

                    </form>

                     </DialogContent>

            </Dialog>
            

         </section>
    )}

                                   
       
    
