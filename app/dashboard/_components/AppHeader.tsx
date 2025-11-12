"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function AppHeader() {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 shadow bg-sidebar">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <UserButton  />
    </div>
  );
}

export default AppHeader;
