"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializeTransaction = (obj) => {
  // Add safety check
  if (!obj) return null;
  
  const serialized = { ...obj };
  if (obj.amount !== undefined && obj.amount !== null) {
    // Handle both Decimal and number types
    serialized.amount = typeof obj.amount === 'object' && obj.amount.toNumber 
      ? obj.amount.toNumber() 
      : Number(obj.amount);
  }
  return serialized;
}

export async function createTransaction(data){

    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });

        if (!user) throw new Error("User not found");

        // Get request data for ArcJet
        const req = await request();

        // Check rate limit
        const decision = await aj.protect(req, {
          userId,
          requested: 1, // Specify how many tokens to consume
        });

        if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
            const { remaining, reset } = decision.reason;
            console.error({
              code: "RATE_LIMIT_EXCEEDED",
              details: {
                remaining,
                resetInSeconds: reset,
              },
            });

            return {
              success: false,
              error: "Too many requests. Please try again later.",
              isRateLimit: true
            };
          }

          return {
            success: false,
            error: "Request blocked"
          };
        }


        
    

        const account = await db.account.findUnique({
            where:{
                id:data.accountId,
                userId:user.id,
            },

        })
        if(!account){
            throw new Error("Account not found");
        }

        const balanceChange = data.type === "EXPENSE"?-data.amount:data.amount;
        const newBalance = account.balance.toNumber() + balanceChange;

         const transaction = await db.$transaction(async(tx)=>{
            const newTransaction =  await tx.transaction.create({
                data:{
                    ...data,
                    userId:user.id,
                    nextRecurringDate:data.isRecurring
                    && data.recurringInterval?calculateNextRecurringDate(data.date,data.recurringInterval)
                    :null,
                }
            })

              await tx.account.update({
                where:{id:data.accountId},
                data:{balance:newBalance},
              });

              return newTransaction

         });
       revalidatePath("/dashboard");
       revalidatePath(`/account/%{transaction.accountId}`);

       return{success:true,data:serializeTransaction(transaction)};

    }catch(error){
       console.error("Error creating transaction:", error);
       return {
         success: false,
         error: error.message || "Failed to create transaction"
       };

    };

}

function calculateNextRecurringDate(startDate,interval){
    const date = new Date(startDate);

    switch(interval){
        case "DAILY":
            date.setDate(date.getDate() + 1);
            break;
        case "WEEKLY":
            date.setDate(date.getDate() + 7);
            break;
        case "MONTHLY":
            date.setMonth(date.getMonth() + 1);
            break;
        case "YEARLY":
            date.setFullYear(date.getFullYear() + 1);
            break;  
        
    }

    return date;

}

// Scan Receipt
export async function scanReceipt(file) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    // Convert ArrayBuffer to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )
      
      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If its not a receipt, return an empty object {}
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      },
      prompt,
    ]);

    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    // console.log("Gemini response:", cleanedText);

    try {
      const data = JSON.parse(cleanedText);
      
      // Check if empty object (not a receipt)
      if (Object.keys(data).length === 0) {
        return {
          success: false,
          error: "No receipt data found in the image"
        };
      }

      // Validate required fields
      if (!data.amount || !data.description) {
        return {
          success: false,
          error: "Could not extract complete receipt information"
        };
      }

      return {
        success: true,
        data: {
          amount: parseFloat(data.amount) || 0,
          date: data.date ? new Date(data.date) : new Date(),
          description: data.description || "Receipt scan",
          category: data.category || "other-expense",
          merchantName: data.merchantName || "Unknown merchant",
        }
      };
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      return {
        success: false,
        error: "Invalid response format from AI"
      };
    }
  } catch (error) {
    console.error("Error scanning receipt:", error.message);
    return {
      success: false,
      error: error.message || "Failed to scan receipt"
    };
  }
}

export async function getTransaction(id){
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });

        if (!user) throw new Error("User not found");

        const transaction = await db.transaction.findUnique({
          where:{
            id,
            userId:user.id,
          }
        });

        if(!transaction) throw new Error("Transaction Not found");

        return serializeTransaction(transaction);
      
}

export async function updateTransaction(id,data){
  try{
     const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });

        if (!user) throw new Error("User not found");

        // Get original transaction to calculate balance change

        const originalTransaction = await db.transaction.findUnique({
          where:{
            id,
            userId:user.id,
          },
          include:{
            account:true,
          },
        });

        if(!originalTransaction) throw new Error("Transaction Not Found");

        // Calculate Balance Change
        const oldBalanceChange = 
        originalTransaction.type === "EXPENSE"
        ?-originalTransaction.amount.toNumber()
        :originalTransaction.amount.toNumber();

        const newBalanceChange = 
        data.type==="EXPENSE"?-data.amount:data.amount;

        const netBalanceChange = newBalanceChange - oldBalanceChange;

        // Update transaction and account balance in a transaction

        const transaction = await db.$transaction(async(tx)=>{
          const updated = await tx.transaction.update({
            where:{
              id,
              userId:user.id,
            },
            data:{
              ...data,
              nextRecurringDate:
              data.isRecurring && data.recurringInterval
              ?calculateNextRecurringDate(new Date(data.date),data.recurringInterval)
              :null
            }
          })

          // Update account balance
          await tx.account.update({
            where:{id:data.accountId},
            data:{
              balance:{
                increment:netBalanceChange,
              }
            }
          })
          return updated;
        });

        revalidatePath("/dashboard");
        revalidatePath(`/account/${data.accountId}`);
        return {success:true,data:serializeTransaction(transaction)};

  }catch(error){
   throw new Error(error.message);
  }

}
