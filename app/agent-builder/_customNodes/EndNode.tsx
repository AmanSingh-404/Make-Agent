import React from 'react'
import { Handle, Position } from '@xyflow/react'
import { MousePointer2, Square } from 'lucide-react'
function EndNode({data}:any) {
  return (
    <div>
        <div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-200'>
            <div className='flex items-center gap-2'>
                <Square className='p-1 rounded-lg h-6 w-6 ' style={{backgroundColor:data.bgColor}}/>
                <h2>End</h2>
                <Handle type="target" position={Position.Left}/>    
                {/* <Handle type="source" position={Position.Right}/>     */}
            </div>
        </div>
    </div>
  )
}

export default EndNode