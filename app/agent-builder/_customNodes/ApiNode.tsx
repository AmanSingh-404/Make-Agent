import { Webhook } from 'lucide-react'
import React from 'react'
import { Handle, Position } from '@xyflow/react'

function ApiNode({data}:any) {
  return (
    <div><div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-200'>
        <div className='flex items-center gap-2'>
            <Webhook className='p-1 rounded-lg h-6 w-6' style={{backgroundColor:data.bgColor}}/>
            <div className='flex flex-col'>
              <h2>{data?.label}</h2>
            <p className='text-xs text-gray-500'>API</p>
            </div>
            <Handle type="target" position={Position.Left}/>    
            <Handle type="source" position={Position.Right}/>    
        </div>
    </div></div>
  )
}

export default ApiNode