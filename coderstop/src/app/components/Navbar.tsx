"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu"; // Removed ProductItem as it's not used
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import Image from "next/image";

function Navbar({ classname }: { classname?: string }) {
  const{user,isAuthenticated,isLoading}=useKindeBrowserClient();

  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", classname)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>

        <MenuItem setActive={setActive} active={active} item="platform">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/platforms/github"> GitHub</HoveredLink>
            <HoveredLink href="/platforms/leetcode">LeetCode</HoveredLink>
            <HoveredLink href="/platforms/codeforces">Codeforces</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#"> Blog</HoveredLink>
            <HoveredLink href="#">Help/Support</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Community">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#"> Contact</HoveredLink>
            <HoveredLink href="#"> Feedback</HoveredLink>
            <HoveredLink href="/community/aboutus"> About Us</HoveredLink>
            <HoveredLink href="#"> Social Links</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/login-page"> Profile</HoveredLink>
            <HoveredLink href="#"> Logout</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Dashboard">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard"> Profile</HoveredLink>
          </div>
        </MenuItem>
        <div className="mx-auto">
          {
            isLoading && (<div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2"></div>)
          }
         {
          user?.picture && (<Image
          src={user?.picture}
          alt="profile picture"
          width={50}
          height={50}
          className="rounded-full mx-auto my-2"
          />)

         }
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
