"use client";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1Icon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ReceiptScanner } from "./recipt-scanner";
import { BarLoader } from "react-spinners";

const AddTransactionForm = ({ accounts, categories,editMode = false,initialData = null }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: editMode && initialData ? {
      type: initialData.type,
      amount: initialData.amount,
      description: initialData.description,
      category: initialData.category,
      date: new Date(initialData.date),
      isRecurring: initialData.isRecurring,
      ...(initialData.recurringInterval && {
        recurringInterval: initialData.recurringInterval
      })
    } : {
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: "",
      date: new Date(),
      isRecurring: false,
    },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const onSubmit = async(data)=>{
    const formData={
        ...data,
        amount:parseFloat(data.amount),
    }
    if(editMode){
      transactionFn(editId,formData)
    }else{
      transactionFn(formData);
    }
  };

  useEffect(()=>{
if(transactionResult?.success && !transactionLoading){
    toast.success(
      editMode?
      "Transaction updated Successfully"
      :"Transaction created Successfully")
    reset();
    router.push(`/account/${transactionResult.data.accountId}`)
} else if(transactionResult && !transactionResult.success && !transactionLoading){

    // Handle different types of errors
    if(transactionResult.isRateLimit){
        toast.error("Too many requests. Please try again later.");
    } else {
        toast.error(transactionResult.error || "Failed to create transaction");
    }
}
  },[transactionResult,transactionLoading,editMode])

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const handleScanComplete = useCallback((scannedData) => {
    if (scannedData) {
      console.log("Scanned data received:", scannedData); // Debug log
      
      // Set the form values with scanned data
      if (scannedData.amount) {
        const amountString = scannedData.amount.toString();
        console.log("Setting amount to:", amountString); // Debug log
        setValue("amount", amountString, { shouldValidate: true, shouldDirty: true });
      }
      if (scannedData.description) {
        setValue("description", scannedData.description, { shouldValidate: true, shouldDirty: true });
      }
      if (scannedData.date) {
        setValue("date", new Date(scannedData.date), { shouldValidate: true, shouldDirty: true });
      }
      if (scannedData.category) {
        setValue("category", scannedData.category, { shouldValidate: true, shouldDirty: true });
      }
      // Set type to EXPENSE by default for receipts
      setValue("type", "EXPENSE", { shouldValidate: true, shouldDirty: true });
      
      // Force a re-render by triggering form validation
      setTimeout(() => {
        const currentAmount = getValues("amount");
        console.log("Current amount after setValue:", currentAmount); // Debug log
      }, 100);
      
      toast.success("Receipt data populated in form");
    }
  }, [setValue, getValues]);


  return (
    <>
      {transactionLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
      )}
      <div className="bg-white rounded-lg shadow-sm border p-8 mt-8">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
       {!editMode && <ReceiptScanner onScanComplete={handleScanComplete}/>}
        {/* Type and Date Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Transaction Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full" suppressHydrationWarning>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent suppressHydrationWarning>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                    <SelectItem value="INCOME">Income</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full pl-3 text-left font-normal" suppressHydrationWarning>
                  {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
                  <Calendar1Icon className="ml-auto h-4 w-4 opacity-50"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" suppressHydrationWarning>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => setValue("date", date)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>
        </div>

        {/* Amount and Account Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                {...register("amount")}
                suppressHydrationWarning
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Account</label>
            <Controller
              name="accountId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full" suppressHydrationWarning>
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent suppressHydrationWarning>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} (${parseFloat(account.balance).toFixed(2)})
                      </SelectItem>
                    ))}
                    <CreateAccountDrawer>
                      <Button
                        variant="ghost"
                        className="w-full select-none items-center text-sm outline-none"
                        suppressHydrationWarning
                      >
                        + Create New Account
                      </Button>
                    </CreateAccountDrawer>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.accountId && (
              <p className="text-sm text-red-500">{errors.accountId.message}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full" suppressHydrationWarning>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent suppressHydrationWarning>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <Input 
            placeholder="Enter transaction description" 
            className="w-full"
            {...register("description")}
            suppressHydrationWarning
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Recurring Transaction Toggle */}
        <div className="bg-gray-50 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-base font-semibold text-gray-700 cursor-pointer">
                Recurring Transaction
              </label>
              <p className="text-sm text-gray-600">
                Set up a recurring schedule for this transaction
              </p>
            </div>
            <Controller
              name="isRecurring"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  suppressHydrationWarning
                />
              )}
            />
          </div>

          {isRecurring && (
            <div className="mt-4 space-y-2">
              <label className="text-sm font-semibold text-gray-700">Recurring Interval</label>
              <Controller
                name="recurringInterval"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full" suppressHydrationWarning>
                      <SelectValue placeholder="Select Interval" />
                    </SelectTrigger>
                    <SelectContent suppressHydrationWarning>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                      <SelectItem value="YEARLY">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.recurringInterval && (
                <p className="text-sm text-red-500">{errors.recurringInterval.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Button 
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            suppressHydrationWarning
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
            disabled={transactionLoading}
            suppressHydrationWarning
          >
            {transactionLoading ?
            (
              <>
              <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating...":"Creating..."}
              </>

            ) :editMode?(
                "Update Transaction"
            ) :(
              "Create Transaction"
            )
          }
          </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddTransactionForm;
