import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


function EndSettings({selectedNode,updateFormData}:any) {
    const [formData, setFormData] = useState({
        schema: '',
    })
    useEffect(()=>{
        selectedNode&&setFormData(selectedNode?.data.settings)
    },[selectedNode])
  return (
    <div>
        <h2 className='font-bold'>End</h2>
        <p className='text-xs text-gray-500 mt-2'>Choose the workflow output</p>
        <div className='mt-2 space-y-2'>
            <Label>Output</Label>
            <Textarea placeholder='{name:string}'
            value={formData?.schema}
            onChange={(e)=>setFormData({schema:e.target.value})}
            />
        </div>
        <Button className='w-full mt-2' onClick={()=>{updateFormData(formData);toast.success('Node updated successfully!')}}>Save</Button>
    </div>
  )
}

export default EndSettings