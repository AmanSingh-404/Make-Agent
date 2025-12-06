import React from 'react'
import { Handle, Position } from '@xyflow/react'
import { Merge, Square } from 'lucide-react'
import { Input } from '@/components/ui/input'
const stylehandler = {
    // backgroundColor: '#EADFFD', // Soft pastel red
    top:110,
    // left:10
}
function IfElseNode({data}:any) {
  return (
    <div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-100'>
        <div className='flex items-center gap-2'>
            <Merge className='p-1 rounded-lg h-6 w-6' style={{backgroundColor:data.bgColor}}/>
            <h2>if-else</h2>
        </div>
        <div className='flex flex-col gap-2 max-w-[200px] mt-2'>
            <Input placeholder='If Condition' className='text-sm' disabled/>
            <Input placeholder='Else Condition' className='text-sm' disabled/>
        </div>
        <Handle type="target" position={Position.Left}/>
        <Handle type="source" position={Position.Right} id='if'/>
        <Handle type="source" position={Position.Right} id='else' style={stylehandler}/>
    </div>
  )
}

export default IfElseNode