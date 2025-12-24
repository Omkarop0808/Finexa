"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// since next js dont support decimal so we serialized here the number
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


export async function createAccount(data){

    try{
          const {userId} = await auth();
        if(!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where:{clerkUserId:userId},

        });

        if(!user){
            throw new Error("User not found");
        }

        // convert the balance to float before saving
        const balanceFloat = parseFloat(data.balance);
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance amount");
            
        }

        const existingAccounts = await db.account.findMany({
            where: {userId:user.id},
        });

        const shouldBeDefault = existingAccounts.length === 0?true:data.isDefault;

        // Only one account should be default ,unset other default account
        if(shouldBeDefault){
            await db.account.updateMany({
                where:{userId:user.id , isDefault:true},
                data:{isDefault:false},
            })
        }

        const account = await db.account.create({
           data:{
             name: data.name,
             type: data.type,
            balance:balanceFloat,
            userId:user.id,
            isDefault:shouldBeDefault,
           },
        })
       
         const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");//refetch the values 
        return{ success:true, data:serializedAccount};
    }catch(error){
       console.error("Create account error:", error);
       throw new Error(error?.message || "Failed to create account");
    }
}

export async function getUserAccount(){
     const {userId} = await auth();
        if(!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where:{clerkUserId:userId},

        });

        if(!user){
            throw new Error("User not found");
        }

    const accounts = await db.account.findMany({
        where:{userId:user.id},
        orderBy:{createdAt:"desc"},
        include:{
            _count:{
                select:{
                    transactions:true,
                }
            }
        }
    });

     const serializedAccount = accounts.map(serializeTransaction);
     
     return serializedAccount;


}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}