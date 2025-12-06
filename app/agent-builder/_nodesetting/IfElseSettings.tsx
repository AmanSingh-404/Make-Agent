import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function IfElseSettings({selectedNode,updateFormData}:any) {
    const [formData, setFormData] = useState({
        ifCondition: '',
    })
    useEffect(()=>{
        selectedNode&&setFormData(selectedNode?.data.settings)
    },[selectedNode])
  return (
    <div>
        <h2 className='font-bold'>IF ELSE</h2>
        <p className='text-xs text-gray-500 mt-2'>Creaye Condition to branch your workflow</p>

        <div className='mt-2 space-y-2'>
            <Label>If</Label>
            <Input placeholder='Enter condition e.g output==`any condition`'
            onChange={(e)=>setFormData({ifCondition:e.target.value})}
            />
        </div>
        <Button className='w-full mt-2' onClick={()=>{updateFormData(formData);toast.success('Node updated successfully!')}}>Save</Button>
    </div>
  )
}

export default IfElseSettings