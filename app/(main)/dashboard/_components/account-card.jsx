"use client";

import React, { useEffect, useState, useId } from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { updateDefaultAccount } from '@/actions/accounts';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';

const AccountCard = ({account}) => {
    const {name,type,balance,id,isDefault} = account;
    const [isUpdating, setIsUpdating] = useState(false);
    const switchId = useId(); // Stable ID for hydration

    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updateAccount,
        error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async (checked) => {
        // Prevent action if already default
        if (isDefault && checked) {
            return; // Already default, no action needed
        }
        
        if (isDefault && !checked) {
            toast.warning("You need at least 1 default account");
            return;
        }

        setIsUpdating(true);
        try {
            await updateDefaultFn(id);
        } catch (err) {
            console.error("Switch error:", err);
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if (updateAccount?.success) {
            toast.success("Default account updated successfully");
        }
    }, [updateAccount]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to update default account");
        }
    }, [error]);
  return (
  <Card className="hover:shadow-md transition-shadow group relative">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Link href={`/account/${id}`} className="flex-1">
        <CardTitle className="text-sm font-medium capitalize hover:text-blue-600 transition-colors">
          {name}
        </CardTitle>
      </Link>
      <Switch 
        id={switchId}
        checked={isDefault} 
        onCheckedChange={handleDefaultChange}
        disabled={updateDefaultLoading || isUpdating}
      />
    </CardHeader>
    
    <Link href={`/account/${id}`}>
      <CardContent>
        <div className="text-2xl font-bold">
          ${parseFloat(balance).toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground">
          {type.charAt(0) + type.slice(1).toLowerCase()} Account
        </p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground mt-6 mb-0" >
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500"/>
          Income 
        </div>
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-red-500"/>
          Expense
        </div>
      </CardFooter>
    </Link>
  </Card>
  )
}

export default AccountCard