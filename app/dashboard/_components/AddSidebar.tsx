"use client";
import React, { useContext } from 'react'
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
// import { UserDetailsContext } from '@/context/UserDetailsContext';

const MenuOptions = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'AI Agents',
        url: '#',
        icon: Headphones
    },
    {
        title: 'Data',
        url: '#',
        icon: DatabaseIcon
    },
    {
        title: 'Pricing',
        url: '#',
        icon: Wallet
    },
    {
        title: 'Profile',
        url: '#',
        icon: User2Icon
    }
];

function AddSidebar() {
    const { open } = useSidebar();
    const { UserDetail, setUserDetail } = useContext(UserDetailContext);
    const path=usePathname();

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
                <div className="flex gap-3 items-center">
                    <Gem className="text-yellow-500" />
                    {open && <h2>Remaining Credit: <span className='font-bold'>{UserDetail?.token ?? 0}</span> </h2>}
                </div>
                {open && <Button className='text-white'>Upgrade To Unlimited</Button>}{}
            </SidebarFooter>
        </Sidebar>
    );
}

export default AddSidebar;
