"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu"; 
import { cn } from "@/utils/cn";
import Link from "next/link";



function Navbar({ classname }: { classname?: string }) {
  

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

        <MenuItem setActive={setActive} active={active} item="Platform">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/platforms/github"> GitHub</HoveredLink>
            <HoveredLink href="/platforms/leetcode">LeetCode</HoveredLink>
            <HoveredLink href="/platforms/codeforces">Codeforces</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Community">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/community/contact"> Contact</HoveredLink>
            <HoveredLink href="/community/feedback"> Feedback</HoveredLink>
            <HoveredLink href="/community/aboutus">About Us</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/account/login"> Sign-in</HoveredLink>
            <HoveredLink href="/account"> Sign-up</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Dashboard">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard"> Profile</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
