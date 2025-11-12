import React from 'react'
import DashboardProvider from './provider'

function layout({children}: any) {
  return (
    <div>
        <DashboardProvider> 
        {children}
        </DashboardProvider>
        </div>
  )
}

export default layout