import React from 'react'
import { useContext } from 'react';
import { WorkflowContext } from '@/context/WorkflowContext';
import AgentSetting from '../_nodesetting/AgentSetting';
import EndSettings from '../_nodesetting/EndSettings';
import IfElseSettings from '../_nodesetting/IfElseSettings';
import WhileSettings from '../_nodesetting/WhileSettings';
import UserApproval from '../_nodesetting/UserApproval';
import ApiAgentSettings from '../_nodesetting/ApiSettings';

function SettingPannel() {
  const { selectedNode, setAddedNodes } = useContext(WorkflowContext);
  const onUpdateNodeData = (formData: any) => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        label: formData.name,
        settings: formData
      }
    }
    setAddedNodes((prevNode: any) => prevNode.map((node: any) => node.id === selectedNode.id ? updatedNode : node))
  }
  return selectedNode && (
    <div className='p-5 bg-gray-100 rounded-2xl w-[350px] shadow-lg'>
      {selectedNode && selectedNode.type === 'AgentNode' && <AgentSetting selectedNode={selectedNode}
        updateFormData={(value: any) => onUpdateNodeData(value)} />}
      {selectedNode && selectedNode?.type === 'EndNode' && <EndSettings
      selectedNode={selectedNode}
        updateFormData={(value: any) => onUpdateNodeData(value)}
      />}
      {selectedNode && selectedNode?.type === 'IfElseNode' && <IfElseSettings
      selectedNode={selectedNode}
        updateFormData={(value: any) => onUpdateNodeData(value)}
      />}
      {selectedNode && selectedNode?.type === 'WhileNode' && <WhileSettings
      selectedNode={selectedNode}
        updateFormData={(value: any) => onUpdateNodeData(value)}
      />}
      {selectedNode && selectedNode?.type === 'UserApprovalNode' && <UserApproval
      selectedNode={selectedNode}
        updateFormData={(value: any) => onUpdateNodeData(value)}
      />}
      {selectedNode && selectedNode?.type === 'ApiNode' && <ApiAgentSettings
      selectedNode={selectedNode}
        updateFormData={(value: any) => onUpdateNodeData(value)}
      />}
    </div>
  )
}

export default SettingPannel