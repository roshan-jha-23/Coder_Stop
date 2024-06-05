"use client";
import React from "react";
import { Button } from "./ui/moving-border";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export function Logout() {
    const router=useRouter();
    const logoutFxn=async()=>{
        try {
            const response=await axios.post('api/users/logout');
            toast.success("You have been successfully LoggedOut");
            router.push('/account/login')
        } catch (error:any) {
            toast.error("there was some error logging you out",error.message);
        }
    }
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-red-500 dark:bg-red-700 text-white border-red-600 dark:border-red-900 py-1 px-3 text-sm"
        onClick={logoutFxn}
      >
        Logout
      </Button>
    </div>
  );
}
