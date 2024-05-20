"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu"; // Removed ProductItem as it's not used
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

        <MenuItem setActive={setActive} active={active} item="Coding Platforms">
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
            <HoveredLink href="#"> About Us</HoveredLink>
            <HoveredLink href="#"> Social Links</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#"> Profile</HoveredLink>
            <HoveredLink href="#"> Logout</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
