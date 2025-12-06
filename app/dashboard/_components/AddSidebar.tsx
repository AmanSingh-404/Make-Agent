"use client";
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import { DatabaseIcon, Headphones, LayoutDashboard, Wallet, User2Icon, Gem } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDeatailsContext';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
// import { UserDetailsContext } from '@/context/UserDetailsContext';

const MenuOptions = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'AI Agents',
        url: '/dashboard/my-agents',
        icon: Headphones
    },
    {
        title: 'Data',
        url: '/dashboard/data',
        icon: DatabaseIcon
    },
    {
        title: 'Pricing',
        url: '/dashboard/pricing',
        icon: Wallet
    },
    {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: User2Icon
    }
];

function AddSidebar() {
    const { open } = useSidebar();
    const { UserDetail, setUserDetail } = useContext(UserDetailContext);
    const path=usePathname();
    const {has}=useAuth();
    const [totalRemainingCreadit, setTotalRemainingCreadit] = useState(0);

    const isPaidUser = has&&has({ plan: 'unlimited_plan' })

    useEffect(()=>{
        if(!isPaidUser && UserDetail?.id){
            GetUserAgent();
        }
    },[UserDetail])

    const convex = useConvex();
    const GetUserAgent=async()=>{
        const result = await convex.query(api.agent.GetUserAgents,{
            userId:UserDetail?.id
        });
        setTotalRemainingCreadit(2 - Number(result?.length || 0));
        setUserDetail({
            ...UserDetail,
            totalRemainingCreadit:2 - Number(result?.length || 0)
        })
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex gap-3 items-center">
                    <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                    {open && <h2 className="font-bold text-2xl">Make Agent</h2>}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>

                    <SidebarMenu>
                        {MenuOptions.map((menu, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild
                                isActive={path===menu.url}
                                >
                                    <Link href={menu.url}>
                                        <menu.icon className="mr-2" />
                                        <span>{menu.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>

                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mb-2">
                {isPaidUser && (
                    <div className="flex gap-3 items-center">
                        <Gem className="text-yellow-500" />
                        {open && <h2>Remaining Credit: <span className='font-bold'>{totalRemainingCreadit}/2</span> </h2>}
                    </div>
                )}
                {!isPaidUser && <Button className='text-white'>Upgrade To Unlimited</Button>}
            </SidebarFooter>
        </Sidebar>
    );
}

export default AddSidebar;
