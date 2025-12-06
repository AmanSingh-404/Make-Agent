import { Position } from '@xyflow/react'
import { MousePointer2, Pointer } from 'lucide-react'
import React from 'react'
import { Handle } from '@xyflow/react'

function AgentNode({data}: any) {
  return (
    <div><div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-200'>
        <div className='flex items-center gap-2'>
            <MousePointer2 className='p-1 rounded-lg h-6 w-6 bg-green-100'/>
            <div className='flex flex-col'>
              <h2>{data?.label}</h2>
            <p className='text-xs text-gray-500'>Agent</p>
            </div>
            
            <Handle type="target" position={Position.Left}/>    
            <Handle type="source" position={Position.Right}/>    
        </div>
    </div></div>
  )
}

export default AgentNode