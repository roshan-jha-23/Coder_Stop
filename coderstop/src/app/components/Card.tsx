"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import Link from "next/link";

// Define props type
interface CardProps {
  username: string;
  avatar: string;
  bio: string;
  url: string;
  followers: string;
}

export function Card({ username, avatar, bio, followers, url }: CardProps) {
  return (
    <CardContainer className="inter-var shadow-lg transition-transform duration-300 hover:scale-105">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-2xl font-semibold text-orange-500 dark:text-orange-400"
        >
          {username}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {bio}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={avatar}
            height={1000}
            width={1000}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`${username}'s avatar`}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ="50"
            className="text-xl font-semibold text-orange-500 dark:text-orange-400"
          >
            Followers: {followers}
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-xl font-semibold text-orange-500 hover:underline dark:text-orange-400"
          >
            <Link href={url} target="_blank">
              Visit Site
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
