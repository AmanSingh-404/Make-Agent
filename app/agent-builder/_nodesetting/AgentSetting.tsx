import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileJson } from 'lucide-react'
import React, { useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function AgentSetting({ selectedNode, updateFormData }: any) {
  const [formData, setFormData] = React.useState({
    name: '',
    instruction: '',
    includeChatHistory: true,
    model: 'model-1',
    output: ' Text',
    schema: '',
  })

  useEffect(() => {
    selectedNode && setFormData(prev => ({
      ...prev,
      ...selectedNode?.data?.settings
    }))
  }, [selectedNode])

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }
  const save = () => {
    console.log(formData)
    updateFormData(formData)
    toast.success('Settings Updated Successfully')
  }
  return (

    <div>
      <h2 className='font-bold'>Agent</h2>
      <p className='text-xs text-gray-500 mt-2'>Call the AI  model with your instruction and </p>
      <div className='mt-2 space-y-2'>
        <Label>Name</Label>
        <Input placeholder='Agent Name' value={formData?.name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div className='mt-3 space-y-2'>
        <Label>Instruction</Label>
        <Textarea placeholder='Instruction' value={formData?.instruction} onChange={(e) => handleChange('instruction', e.target.value)} />
        <h2 className='flex items-center gap-2 mt-2'>Add Context <FileJson className='h-3 w-3' /></h2>
      </div>
      <div className='mt-3 flex justify-between items-center gap-2'>
        <Label>Include Chat History</Label>
        <Switch checked={formData?.includeChatHistory} onCheckedChange={(checked) => handleChange('includeChatHistory', checked)} />
      </div>
      <div className='mt-2 flex justify-between items-center gap-2'>
        <Label className='font-bold'>Model</Label>
        <Select onValueChange={(value) => handleChange('model', value)} defaultValue={formData?.model}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="model-1">Model 1</SelectItem>
            <SelectItem value="model-2">Model 2</SelectItem>
            <SelectItem value="model-3">Model 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-2'>
        <Label className='font-bold'>Output Format</Label>
        <Tabs defaultValue="Text" className="w-[400px]" value={formData?.output} onValueChange={(value) => handleChange('output', value)}>
          <TabsList>
            <TabsTrigger value="Text">Text</TabsTrigger>
            <TabsTrigger value="Json">Json</TabsTrigger>
          </TabsList>
          <TabsContent value="Text"><h2 className='text-xs text-gray-500'>Output will be Text.</h2></TabsContent>
          <TabsContent value="Json"><h2 className='text-xs text-gray-500'>Enter Json Schema.</h2>
            <Textarea placeholder='Json Schema' className='max-w-[300px] mt-1' value={formData?.schema}
              onChange={(e) => handleChange('schema', e.target.value)}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Button className='w-full mt-2' onClick={save}>Save</Button>
    </div>
  )
}

export default AgentSetting