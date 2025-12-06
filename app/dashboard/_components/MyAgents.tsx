"use client"
import React from 'react'
import { UserDetailContext } from '@/context/UserDeatailsContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react';
import { Agent } from '@/types/AgentType'
import { GitBranchPlus} from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'


function MyAgents() {
  const { UserDetail } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();
  useEffect(() => {
    UserDetail && GetUserAgents();
  }, [UserDetail]);
  const GetUserAgents = async () => {
    const result = await convex.query(api.agent.GetUserAgents, { userId: UserDetail?._id });
    setAgentList(result);
  }

  return (
    <div className='w-full'>
      <div className='grid gris-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {agentList.map((agent,index) => (
          <Link href={'/agent-builder/' + agent.agentId} key={index} className='p-3 bordered-2xl shadow-xl rounded-xl'>
            <GitBranchPlus className='text-blue-500'/>
            <h2>{agent.name}</h2>
            <h2 className='text-sm text-gray-500'>{moment(agent._creationTime).fromNow()}</h2>

          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyAgents