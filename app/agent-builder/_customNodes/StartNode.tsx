import { Play } from 'lucide-react'
import React from 'react'
import { Handle, Position } from '@xyflow/react'

function StartNode() {
  return (
    <div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-200'>
        <div className='flex items-center gap-2'>
            <Play className='p-1 rounded-lg h-6 w-6 bg-yellow-100'/>
            <h2>Start</h2>
            <Handle type="source" position={Position.Right}/>    
        </div>
    </div>
  )
}

export default StartNode