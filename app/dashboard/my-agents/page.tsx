import React from 'react'
import MyAgents from '../_components/MyAgents'

function MyAgentsPage() {
  return (
    <div className='flex flex-col gap-4 p-10'>
        <h2 className='text-2xl font-bold '>MyAgents</h2>
        <MyAgents/>
    </div>
  )
}

export default MyAgentsPage