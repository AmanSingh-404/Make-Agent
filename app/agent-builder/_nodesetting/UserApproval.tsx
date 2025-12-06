import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileJson } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

function UserApproval({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
    })
    const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }
  const save = () => {
    console.log(formData)
    updateFormData(formData)
    toast.success('Settings Updated Successfully')
  }
    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data.settings)
    }, [selectedNode])
    return (
        <div>
            <h2 className='font-bold'>User Approval</h2>
            <p className='text-xs text-gray-500 mt-2'>Pause for human approve or reject a step</p>

            <div>
                <h2 className='font-bold'>Agent</h2>
                <p className='text-xs text-gray-500 mt-2'>Describe the message to show to the user </p>
                <div className='mt-2 space-y-2'>
                    <Label>Name</Label>
                    <Input placeholder='Agent Name' value={formData?.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div className='mt-3 space-y-2'>
                    <Label>Message</Label>
                    <Textarea placeholder='Message' value={formData?.message} onChange={(e) => handleChange('message', e.target.value)} />
                </div>
            </div>
            <Button className='w-full mt-2' onClick={save}>Save</Button>
        </div>
    )
}

export default UserApproval