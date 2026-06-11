import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


export const getDashboard = async (month: string) => {

const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("SESSION =", session)

  const userId = session?.user.id;

  if (!userId) {
    redirect("/sign-in");
  }


    const year = 2026

    const starOfMonth = new Date (`${year}-${month}-01T00:00:00`)

    const starOfNextMonth = new Date (
        month === '12'
        ? `${year + 1}-01-01T00:00:00`
        : `${year}-${String(Number(month) + 1).padStart(2, '0')}-01T00:00:00`
    )

    const where = {
        userId,
        date: {
            gte: starOfMonth,
            lt: starOfNextMonth
        }
    }

    const depositsTotal = Number(
    (
        await prisma.transaction.aggregate({
        where:
        {
            ...where,
            type: 'DEPOSIT'
        },
        _sum: {
            amount: true
        }

    }))._sum.amount 
)
    const investmentsTotal = Number(
    (
        await prisma.transaction.aggregate({
        where:
        {
            ...where,
            type: 'INVESTMENT'
        },
        _sum: {
            amount: true
        }

    }))._sum.amount 
)
    const expensesTotal = Number(
    (
        await prisma.transaction.aggregate({
        where:
        {
            ...where,
            type: 'EXPENSE'
        },
        _sum: {
            amount: true
        }

    }))._sum.amount 
)

const balance = depositsTotal -investmentsTotal - expensesTotal

const transactionsTotal =Number(
    (
        await prisma.transaction.aggregate({
        where:
        {
            ...where,
           
        },
        _sum: {
            amount: true
        }

    }))._sum.amount 
)

const typePercentage = {
    [TransactionType.DEPOSIT]:Math.round(Number(depositsTotal) / Number(transactionsTotal) * 100),

    [TransactionType.INVESTMENT]:Math.round(Number(investmentsTotal) / Number(transactionsTotal) * 100),

    [TransactionType.EXPENSE]:Math.round(Number(expensesTotal) / Number(transactionsTotal) * 100)

}
const totalExpensePerCategory = (
    await prisma.transaction.groupBy({
    by: ['category'],
    where: {
        ...where,
        type: TransactionType.EXPENSE
    },
    _sum: {
        amount: true

    }
})).map((category) => ({
    category: category.category,
    totalAmont: Number(category._sum.amount),
    percentageOfTotal: Math.round(Number(category._sum.amount) / Number(expensesTotal) * 100)


}))





return{
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typePercentage,
    totalExpensePerCategory,
    transactionsTotal,
    session
}
}
        



//timestamp: pega tudo atual(data, horario...)usa quando se precisa saber realmente a hora exata
//date:pega somente a data a tual, aqui somente a data for importante