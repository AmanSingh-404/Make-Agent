import { Button } from '@/components/ui/button'
import { ChevronLeft, Code2, Play, X } from 'lucide-react'
import React from 'react'
import { Agent } from '@/types/AgentType'
import Link from 'next/link'

type Props = {
    agentDetail: Agent | undefined
    previewHeader?: boolean,
    OnPublish: () => void
}

function Header({agentDetail, previewHeader = false, OnPublish}:Props) {
  return (
    <div className='p-3 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <ChevronLeft className='h-6 w-6'/>
            <h2 className='text-lg font-semibold mt-1'>{agentDetail?.name}</h2>
        </div>
        <div className='flex items-center gap-2'>
            <Button variant={'outline'}><Code2 />Code</Button>
            {!previewHeader ? <Link href={`/agent-builder/${agentDetail?.agentId}/preview`}><Button><Play />Preview</Button ></Link>:<Link href={`/agent-builder/${agentDetail?.agentId}`}><Button variant={'outline'}><X />Close Preview</Button></Link>}

            <Button onClick={OnPublish}>Publish</Button>
        </div>
    </div>
  )
}

export default Header