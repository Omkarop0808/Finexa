import { getCurrentBudget } from '@/actions/budget';
import { getDashboardData, getUserAccount } from '@/actions/dashboard';
import AccountCard from '@/app/(main)/dashboard/_components/account-card';
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus} from 'lucide-react';
import React from 'react'
import BudgetProgress from './_components/budget-progress';
import { DashboardOverview } from './_components/transaction-overview';

const DashBoardPage = async() => {
  const accounts = await getUserAccount();
  const transactions = await getDashboardData();

  const defaultAccount = accounts?.find((account)=>account.isDefault);
  let budgetData = null;

  if(defaultAccount){
    budgetData = await getCurrentBudget(defaultAccount.id);
  }
  return (
    <div className="space-y-8">

      {/* Buget Progress */}

      {defaultAccount && 
      <BudgetProgress
       initialBudget={budgetData?.budget} 
       currentExpenses={budgetData?.currentExpenses||0}
      />}
       {/* Dashboard Overview */}
      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* Accounts Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <CreateAccountDrawer>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-gray-300 flex items-center justify-center h-40">
                <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                  <Plus className="h-10 w-10 mb-2"/>
                  <p className="text-sm font-medium">Add New Account</p>
                </CardContent>
              </Card>

        </CreateAccountDrawer>
{accounts.length>0 && accounts?.map((account)=>{
  return <AccountCard key={account.id} account={account}/>

})}
      
      </div>
           
 
    </div>
  )
}

export default DashBoardPage