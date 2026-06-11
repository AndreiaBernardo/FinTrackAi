import { Sidebar } from "@/app/_components/sidebar";
import { Header } from "@/app/_components/header";
import BalanceCard from "./_components/balance-card";
import { FinancialMetricCard } from "./_components/financial-metric-card";
import { ChartCard } from "./_components/chart-card";
import { AiInsights } from "./_components/ai-insights";
import { RecentTransactions } from "./_components/recent-transactions";
import { getDashboard } from "./data/get-dashboard";
import dayjs from "dayjs";



//disparar o mes
interface DashboardProps {
  searchParams:Promise< {
    month?: string
  }>
  }


export default async function Home({searchParams}:DashboardProps) {

const params = await searchParams

  const month = params.month ?? dayjs().format('MM')
  
  const data = await getDashboard(month)

 

  return(

    <>
    <div className=" flex min-h-screen bg-[#0F111A]">
 
      <Sidebar/>

      <div className="flex flex-1 flex-col text-white w-full overflow-y-auto">
        <Header 
        userName={data.session.user.name}
        date={new Date()}/>
        <main className="p-8 space-y-8">
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 col-span-1">
              <BalanceCard
            balance={data.balance}
            receitas={data.depositsTotal}
            despesas={data.expensesTotal}
          />
            </div>

            <div >

              <FinancialMetricCard/>
            
            </div>
             </section>

             <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex-1">
                <ChartCard
              depositsTotal={data.depositsTotal}
              expensesTotal={data.expensesTotal}
              investmentsTotal={data.balance}
              balance={data.balance}
              />
              </div>
              
              <div className="flex-1">
                  
                  <AiInsights month={""} year={0} depositsTotal={0} expensesTotal={0} investmentsTotal={0} balance={0} totalExpensePerCategory={[]}/>

              </div>


             </section>

             <section>
               <RecentTransactions />
               </section>
             
             
           

            
          
        </main>
      </div>
      
    </div>
   

   
    
      </>
        

       
        
        
    
  
  ) 
}