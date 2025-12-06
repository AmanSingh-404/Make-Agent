import React from 'react'
import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Handle } from '@xyflow/react'
import { Position } from '@xyflow/react'

const handlerstyle = {
    top:110,
    // left:10
}
function UserAoorovalNode({data}:any) {
  return (
    <div className='p-2 rounded-xl bg-gray-100 hover:bg-gray-100'>
        <div className='flex items-center gap-2'>
            <ThumbsUp className='p-1 rounded-lg h-6 w-6' style={{backgroundColor:data.bgColor}}/>
            <h2>User Approval</h2>
        </div>
        <div className='flex flex-col gap-2 max-w-[200px] mt-2'>
            <Button variant='outline' disabled>Approve</Button>
            <Button variant='outline' disabled>Reject</Button>
        </div>
        <Handle type="target" position={Position.Left}/>
        <Handle type="source" position={Position.Right} id='approve'/>
        <Handle type="source" position={Position.Right} id='reject' style={handlerstyle}/>
    </div>
  )
}

export default UserAoorovalNode