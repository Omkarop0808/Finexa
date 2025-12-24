import { getUserAccount } from '@/actions/dashboard';
import React from 'react'
import AddTransactionForm from './_components/transaction-form';
import { defaultCategories } from '@/data/categories';
import { getTransaction } from '@/actions/transaction';

const AddTransactionPage = async({searchParams}) => {
  
  const accounts = await getUserAccount();
  const params = await searchParams;
  const editId = params?.edit;
  let initialData = null;
  
  // TOle: Add edit functionality later if needed
  if(editId) {
    
    // Fetch transaction data for editing
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
       <h1 className="text-5xl sm:text-6xl font-bold tracking-tight capitalize  bg-gradient-to-r from-blue-600 to-purple-600
              bg-clip-text text-transparent">{editId?"Edit ": "Add "}
                Transaction
        </h1>

        <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
        />
    </div>
  )
}

export default AddTransactionPage