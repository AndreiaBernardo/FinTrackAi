'use server'

import { auth } from "@/lib/auth"
import { createTransactionFormSchema, type CreateTransactionFormData } from "../_schemas/transaction"
import {prisma} from '@/lib/prisma'
import { Prisma } from "@prisma/client"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

type AddTransactionParams = Omit<
Prisma.TransactionCreateInput,
 'user' | 'useId'
 >


export const addTransaction = async (params: AddTransactionParams) => {
    const data = createTransactionFormSchema.parse(params)

    //SABER SE O USUARIO ESTA AUTENTICADO DENTRO DA APLICAÇÃO
    const session = await auth.api.getSession({
        headers:await headers(),
    })
    
    const userId = session?.user.id

    if (!userId){
        redirect('/sign-in')
    }

    await prisma.transaction.create({
        data:{
            ...data, 
            user:{
                connect:{
                    id:userId,
                }
            }
        }
    })


    
}