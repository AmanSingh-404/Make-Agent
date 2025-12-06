import { Repeat } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
function WhileNode({data}:any) {
  return (
    <div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-100'>
        <div className='flex items-center gap-2'>
            <Repeat className='p-1 rounded-lg h-6 w-6' style={{backgroundColor:data.bgColor}}/>
            <h2>while</h2>
        </div>
        <div className='flex flex-col gap-2 max-w-[200px] mt-2'>
            <Input placeholder='While Condition' className='text-sm' disabled/>
        </div>
        <Handle type="target" position={Position.Left}/>
        <Handle type="source" position={Position.Right}/>
    </div>
  )
}

export default WhileNode