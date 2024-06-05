import React from 'react'
import { Logout } from '../components/LogoutButton'

function page() {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 right-0 m-4">
        <Logout />
      </div>
    </div>
  );
}

export default page
