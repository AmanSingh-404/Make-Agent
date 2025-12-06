"use client"
import React, { useState, useCallback } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, MiniMap, Controls, Panel, useOnSelectionChange, OnSelectionChangeParams } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodeTypes';
import AgentToolsPanel from '../_components/AgentToolsPanel';
import { useContext, useEffect } from 'react';
import { WorkflowContext } from '@/context/WorkflowContext';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Agent } from '@/types/AgentType';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import SettingPannel from '../_components/SettingPannel';
import PublishCodeDailoag from './preview/_components/PublishCodeDailoag';

function AgentBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const { agentId } = useParams();

  const { addedNodes, setAddedNodes, addedEdges, setAddedEdges, setSelectedNode } = useContext(WorkflowContext);
  const updateAgentDetail = useMutation(api.agent.UpdateAgentDetail);
  const convex = useConvex();
  const [agentDetail, setAgentDetail] = useState<Agent>();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    GetAgentById();
  }, [])

  const GetAgentById = async () => {
    const result = await convex.query(api.agent.GetAgentById, { agentId: agentId as string })
    setAgentDetail(result);
  }

  useEffect(() => {
    if (agentDetail) {
      setNodes(agentDetail.nodes || []);
      setEdges(agentDetail.edges || []);
      setAddedNodes(agentDetail.nodes || []);
      setAddedEdges(agentDetail.edges || []);
    }

  }, [agentDetail]);

  useEffect(() => {
    addedNodes && setNodes(addedNodes);
    addedEdges && setEdges(addedEdges);
  }, [addedNodes]);

  useEffect(() => {
    edges && setAddedEdges(edges);
  }, [edges]);

  const SaveNodeaAndEdges = async () => {
    const result = await updateAgentDetail({
      // @ts-ignore
      id: agentDetail?._id,
      nodes: addedNodes,
      edges: addedEdges
    })
    console.log(result);
    toast.success("Agent Updated Successfully");
  }

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => {
      const updated = applyNodeChanges(changes, nodesSnapshot || []);
      setTimeout(() => {
        setAddedNodes(updated);
      }, 0);
      return updated
    }),
    [setAddedNodes],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot || [])),
    [],
  );

  const onConnect = useCallback(
    // @ts-ignore
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot || [])),
    [],
  );


  const onNodeSelect = useCallback(({ nodes, edges }: OnSelectionChangeParams) => {
    setSelectedNode(nodes[0]);
  }, [])

  const onPublish = () => {
    setOpenDialog(true);
  }

  useOnSelectionChange({
    onChange: onNodeSelect
  })

  return (
    <div>
      <Header agentDetail={agentDetail} OnPublish={onPublish} />
      <div style={{ width: '100vw', height: '90vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          {/* @ts-ignore */}
          <Background variant='dots' gap={10} size={1} color='gray' />
          <Panel position='top-left'>
            <AgentToolsPanel />
          </Panel>
          <Panel position='top-right'>
            <SettingPannel />
          </Panel>
          <Panel position='bottom-center'>
            <Button onClick={SaveNodeaAndEdges}><Save />Save</Button>
          </Panel>
        </ReactFlow>
      </div>
      <PublishCodeDailoag openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  )
}

export default AgentBuilder