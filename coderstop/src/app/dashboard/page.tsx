import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import React from 'react'
import {redirect} from 'next/navigation'
async function page() {
    const {isAuthenticated}=getKindeServerSession();
    const isLoggedIn=await isAuthenticated();
    if(!isLoggedIn){
         redirect('/login-page')
    }
  return (
    <div>
      sexy
    </div>
  )
}

export default page
