"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  // Add safety check
  if (!obj) return null;
  
  const serialized = { ...obj };
  if (obj.balance !== undefined && obj.balance !== null) {
    // Handle both Decimal and number types
    serialized.balance = typeof obj.balance === 'object' && obj.balance.toNumber 
      ? obj.balance.toNumber() 
      : Number(obj.balance);
  }

  if (obj.amount !== undefined && obj.amount !== null) {
    // Handle both Decimal and number types
    serialized.amount = typeof obj.amount === 'object' && obj.amount.toNumber 
      ? obj.amount.toNumber() 
      : Number(obj.amount);
  }
  
  return serialized;
};

export async function updateDefaultAccount(accountId){
     try{
          const {userId} = await auth();
            if(!userId) throw new Error("Unauthorized");
    
            const user = await db.user.findUnique({
                where:{clerkUserId:userId},
    
            });
    
            if(!user){
                throw new Error("User not found");
            }

             await db.account.updateMany({
                where:{userId:user.id,isDefault:true},
                data:{isDefault:false},

             });

             const account = await db.account.update({
                where:{
                    id:accountId,
                    userId:user.id,
                },

                data:{
                     isDefault:true,
                }
             })

             revalidatePath("/dashboard");
             return{success:true,data:serializeTransaction(account)}
        }catch(error){
            return {success:false,error:error.message};
        }
}

            
export async function getAccountWithTransactions(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
      include: {
        transactions: {
          orderBy: { date: "desc" },
          take: 50, // Limit to recent 50 transactions for performance
        },
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) return null;

    return {
      ...serializeTransaction(account),
      transactions: account.transactions.map(serializeTransaction),
      totalTransactions: account._count.transactions,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function bulkDeleteTransactions(transactionIds){
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const transactions = await db.transaction.findMany({
      where:{
        id:{in:transactionIds},
        userId:user.id,
      },
    })

    const accountBalanceChanges = transactions.reduce((acc,transaction)=>{
        // Convert Decimal to number for proper calculation
        const amount = typeof transaction.amount === 'object' && transaction.amount.toNumber 
          ? transaction.amount.toNumber() 
          : Number(transaction.amount);
          
        const change = transaction.type === "EXPENSE" ? amount : -amount;

        acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
        return acc;
    },{})

    // Delete transactions and update account balances in transaction->multiple api call
    // need to be done prism ahave $transaction own so we ca n use it 
    await db.$transaction(async (tx)=>{
            await tx.transaction.deleteMany({
              where:{
                id:{in:transactionIds},
                userId:user.id,
              },
             
            });

           for(const [accountId,balanceChange] of Object.entries(
             accountBalanceChanges
           )){
               await tx.account.update({
                where:{
                  id:accountId
                },
                data:{
                  balance:{
                    increment:balanceChange,//increment is a database-level atomic operation.
                    //Take the current balance in the database and add balanceChange to it in one step.
                  }
                }
               })
           }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");
    return {success:true};


  }catch(error){
    return {success:false,error:error.message};
    
  }
  
}
