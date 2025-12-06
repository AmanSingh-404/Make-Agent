import { Merge, MousePointer, Square, ThumbsUp, Webhook } from 'lucide-react'
import React from 'react'
import { useContext } from 'react'
import { WorkflowContext } from '@/context/WorkflowContext'
const AgentTools = [
    {
    name: 'Agent',
    icon: MousePointer,
    bgColor: '#CDF7E3', // Light mint green
    id: 'agent',
    type: 'AgentNode',

},
{
    name: 'End',
    icon: Square,
    bgColor: '#FFE3E3', // Soft pastel red
    id: 'end',
    type: 'EndNode',

},

{
    name: 'If/Else',
    icon: Merge,
    bgColor: '#FFF3CD', // Light pastel yellow
    id: 'ifelse',
    type: 'IfElseNode',
},
{
    name: 'while',
    icon: Square,
    bgColor: '#EADFFD', // Soft pastel red
    id: 'while',
    type: 'WhileNode',
},
{
    name: 'Approval',
    icon: ThumbsUp,
    bgColor: '#D1FOFF', // Soft pastel red
    id: 'approval',
    type: 'UserApprovalNode',

},

{
    name: 'API',
    icon: Webhook,
    bgColor: '#E3E3FF', // Soft pastel red
    id: 'api',
    type: 'ApiNode',

},

];


function AgentToolsPanel() {

    const { addedNodes, setAddedNodes } = useContext(WorkflowContext);

    const onAgentToolClick = (tool: any) => {
        const newNode = {
            id: `${tool.id}-${Date.now()}`,
            position: { x: 0, y: 100 },
            data: { label: tool.name,bgColor:tool.bgColor,id:tool.id,type:tool.type },
            type: tool.type,
        };
        setAddedNodes((prev:any)=> [...prev, newNode]);
    }
    return (
        <div className='p-5 bg-gray-100 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold'>Agent Tools</h2>
            <div >
                {AgentTools.map((tool) => (
                    <div key={tool.id} className='flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg' onClick={() => onAgentToolClick(tool)}>
                        <div className='p-2 rounded-lg bg-gray-200'>
                            <tool.icon className='h-6 w-6'
                            style={{
                                backgroundColor: tool.bgColor
                            }}
                            />
                        </div>
                        <h2 className='text-sm font-semibold'>{tool.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentToolsPanel