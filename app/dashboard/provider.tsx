import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import  AddSidebar  from './_components/AddSidebar'
import React from 'react'
import AppHeader from './_components/AppHeader'

function DashboardProvider({children}: any) {
  return (
     <SidebarProvider>
      <AddSidebar />

    <div className="flex flex-col w-full">
      <AppHeader />
      {children}</div>
    </SidebarProvider>
  )
}

export default DashboardProvider