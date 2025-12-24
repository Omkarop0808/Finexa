
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";


const Header = async() => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-[#f8f9fb]/90 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="container mx-auto px-3 py-3 flex items-center justify-between">

        <Link href="/">
          <Image
            src="/logo.png"
            alt="Finnexa Logo"
            width={200}
            height={10}
            className="object-contain h-15"
          />
        </Link>

        <div className="flex items-center gap-4">

          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2" suppressHydrationWarning>
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2 bg-[#5a4af4] hover:bg-[#4938e5] text-white" suppressHydrationWarning>
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
             <Button className="bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100 hover:bg-[#4938e5]/90 space-x-4 hover:text-white hover:border-transparent" suppressHydrationWarning>
  Login
</Button>

            </SignInButton>

            <SignUpButton>
              <Button className="bg-[#5a4af4] hover:bg-[#4938e5] text-white px-4" suppressHydrationWarning>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton 
              appearance={{
                elements:{
                  avatarBox:"w-20 h-20 rounded-full"
                }
              }}
              suppressHydrationWarning
            />
          </SignedIn>

        </div>
      </nav>
    </div>
  );
};

export default Header;
