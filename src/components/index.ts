import dynamic from "next/dynamic";
import { useState } from "react";

export const Layout = dynamic(() => import("@/components/layout"));

export const Avatar = dynamic(() => import("@/components/avatar"));
export const Bg = dynamic(() => import("@/components/bg"));
export const Music = dynamic(() => import("@/components/music"));
export const GithubComponent = dynamic(
  () => import("@/components/githubComponent")
);
