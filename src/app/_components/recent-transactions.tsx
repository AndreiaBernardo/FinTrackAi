import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

import { TransactionIcon } from "./transaction-icon"
import Link from "next/link"

import { AddTransactionButton } from "@/app/_components/add-transaction-button"
import { getRecentTransactions } from "../data/get-recent-transactions"







export const RecentTransactions =async() => {
    // const recentTransactionsMock: Transaction[] = [{
    //     id: '1',
    //     name: 'Salário',
    //     amount: 8500,
    //     type: 'DEPOSIT',
    //     category: 'SALARY',
    //     date: new Date(2026, 1, 1),
    // },
    // {
    //     id: '2',
    //     name: 'Aluguel',
    //     amount: 2200,
    //     type: 'EXPENSE',
    //     category: 'HOUSING',
    //     date: new Date(2026, 1, 3),

    // },
    // {
    //     id: '3',
    //     name: 'Supermercado',
    //     amount: 680.9,
    //     type: 'EXPENSE',
    //     category: 'FOOD',
    //     date: new Date(2026, 1, 4),

    // },
    // {
    //     id: '4',
    //     name: 'Freelance',
    //     amount: 1550,
    //     type: 'DEPOSIT',
    //     category: 'OTHER',
    //     date: new Date(2026, 1, 5),

    
    // },
    // {
    //     id: '5',
    //     name: 'Academia',
    //     amount: 129.9,
    //     type: 'EXPENSE',
    //     category: 'HEALTH',
    //     date: new Date(2026, 1, 6),

    

    // }](nao precisa mas desse codigo, pq foi feito bem no inicio)
    
    const recentTransactions = await getRecentTransactions()

    return (
        <div>
            <div className="flex justify-between mb-5 items-center">
                <p className="text-xl font-bold">
                    Transações recentes
                    </p>
                    <AddTransactionButton/>
                    
                    </div>

                    <div className="bg-[#161b26] rounded-3xl border border-[#1d293d] overflow-hidden">
                        {recentTransactions.map((transaction) => (
                            <div key={transaction.id}
                            className="p-5 flex gap-4 border-b last:border-none bg-[#1d293d] hover:bgp-slate-500/50 transition-colors">
                                <TransactionIcon type={transaction.type} />
                           
                                <TransactionIcon type={transaction.type} />
                                
                                <div className="flex-1">
                                    <p>
                                        {transaction.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {dayjs(transaction.date).format('DD [de] MMMM')}
                                    {''}.{transaction.category}

                                    </p>
                                    
                            </div>

                            <span className={transaction.type === 'EXPENSE'
                            ? 'text-rose-500'
                            : 'text-emerald-500'
}>
                                {transaction.type === 'EXPENSE'
                                ? '-'
                                : '+'
                                }
       {Number (transaction.amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })}
        
        { (typeof transaction.amount === 'number' 
            ? transaction.amount 
            : transaction.amount.toNumber?.() || 0
          ).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })}
        </span>
        </div>
    ))}
    <div className="p-4 bg-slate-800/20 text-center">
        <Link className="text-primary text-sm hover:underline" href="/transactions">
            Ver todo o histórico
        </Link>
    </div>
    </div>
    </div>
    )
}
