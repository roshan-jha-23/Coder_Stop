"use client";
import React from "react";
import { Button } from "./ui/moving-border";
import { useRouter } from "next/navigation";
import axios from "axios";


export function Logout() {
    const router=useRouter();
    const logoutFxn=async()=>{
        try {
            const response=await axios.post('api/users/logout');
           
            router.push('/account/login')
        } catch (error:any) {
          console.log(error)
        }
    }
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-red-500 dark:bg-red-700 text-white border-red-600 dark:border-red-900 py-1 px-2 text-sm"
        onClick={logoutFxn}
      >
        Logout
      </Button>
    </div>
  );
}
