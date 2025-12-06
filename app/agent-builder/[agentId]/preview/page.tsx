"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../_components/Header'
import '@xyflow/react/dist/style.css';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Agent } from '@/types/AgentType';
import { Background, MiniMap, Controls, ReactFlow } from '@xyflow/react';
import { nodeTypes } from '../nodeTypes';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useMutation } from 'convex/react';
import { id } from 'date-fns/locale';
import ChatUi from './_components/ChatUi';
import PublishCodeDailoag from './_components/PublishCodeDailoag';

function previewAgent() {
  const { agentId } = useParams();
  const convex = useConvex();
  const [agentDetail, setAgentDetail] = useState<Agent>();
  const [flowconfig, setFlowconfig] = useState<any>();
  const [loading, setLoading] = useState(false);
  const updateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfig);
  const [conversationId, setConversationId] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    GetAgentById();
  }, [])

  const GetAgentById = async () => {
    const result = await convex.query(api.agent.GetAgentById, { agentId: agentId as string })
    setAgentDetail(result);
  }

  const [config, setConfig] = useState<any>();

  useEffect(() => {
    GetAgentDetail();
  }, [])

  // 📡 Convex query to fetch agent detail by ID
  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string
    });
    setAgentDetail(result);

    const conversationIdResult = await axios.get('/api/agent-chat');
    console.log(conversationIdResult.data);
    setConversationId(conversationIdResult.data.conversationId);
  }

  // 🧩 Generate workflow once agent data is loaded
  useEffect(() => {
    if (agentDetail) {
      GenerateWorkflow()
    }
  }, [agentDetail])

  // ⚙️ Generate workflow config (node/edge relationship)
  const GenerateWorkflow = () => {
    // 🧩 Build Edge Map for quick source → target lookup
    const edgeMap = agentDetail?.edges?.reduce((acc: any, edge: any) => {
      if (!acc[edge.source]) acc[edge.source] = [];
      acc[edge.source].push(edge);
      return acc;
    }, {});

    // 🔄 Build flow array by mapping each node
    const flow = agentDetail?.nodes?.map((node: any) => {
      const connectedEdges = edgeMap[node.id] || [];
      let next: any = null;

      switch (node.type) {
        // 🧭 Conditional branching node with "if" and "else"
        case "IfElseNode": {
          const ifEdge = connectedEdges.find((e: any) => e.sourceHandle === "if");
          const elseEdge = connectedEdges.find((e: any) => e.sourceHandle === "else");

          next = {
            if: ifEdge?.target || null,
            else: elseEdge?.target || null,
          };
          break;
        }

        // 🧠 Agent or AI Node
        case "AgentNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          } else if (connectedEdges.length > 1) {
            next = connectedEdges.map((e: any) => e.target);
          }
          break;
        }

        // 🔗 API Call Node
        case "ApiNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }

        // ✅ User Approval Node (manual checkpoint)
        case "UserApprovalNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }

        // 🚀 Start Node
        case "StartNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }

        // 🏁 End Node
        case "EndNode": {
          next = null; // No next node
          break;
        }

        // 🔧 Default handling for any unknown node type
        default: {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          } else if (connectedEdges.length > 1) {
            next = connectedEdges.map((e: any) => e.target);
          }
          break;
        }
      }

      // 🧱 Return a simplified node configuration
      return {
        id: node.id,
        type: node.type,
        label: node.data?.label || node.type,
        settings: node.data?.settings || {},
        next,
      };
    });

    // 🎯 Find the Start Node
    const startNode = agentDetail?.nodes?.find((n: any) => n.type === "StartNode");

    // 🧱 Final Config structure
    const config = {
      startNode: startNode?.id || null,
      flow,
    };

    setFlowconfig(config);

    console.log("✅ Generated Workflow Config:", JSON.stringify(config));
    // setConfig(config);
  }

  const GenerateAgentToolConfig = async () => {
    setLoading(true);
    const result = await axios.post('/api/generate-agent-tool-config', {
      jsonConfig: agentDetail
    })
    console.log(result.data);
    await updateAgentToolConfig({
      id: agentDetail?._id as any,
      agentToolConfig: result.data
    })
    GetAgentDetail();
    setLoading(false);
  }

  const OnPublish = () => {
    setOpenDialog(true);
  }



  return (
    <div>
      <Header agentDetail={agentDetail} previewHeader={true} OnPublish={OnPublish} />
      <div className='grid grid-cols-4'>
        <div className='col-span-3 p-5 bordered rounded-2xl m-5'>
          <h2 className='text-2xl font-bold'>Preview Agent</h2>
          <div style={{ width: '100%', height: '90vh' }}>
            <ReactFlow
              nodes={agentDetail?.nodes || []}
              edges={agentDetail?.edges || []}
              fitView
              nodeTypes={nodeTypes}
              draggable={false}
            >
              {/* @ts-ignore */}
              <Background variant='dots' gap={10} size={1} color='gray' />
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        </div>
        <div className='col-span-1 border-l h-screen p-5 rounded-2xl'>
          <div className='flex justify-center items-center h-full'>
            {!agentDetail?.agentToolConfig ? <Button onClick={GenerateAgentToolConfig} disabled={loading}> <RefreshCcw className={`${loading && 'animate-spin'}`} />Reboot Agent</Button> : <ChatUi generateAgentToolConfig={GenerateAgentToolConfig} loading={loading} agentDetail={agentDetail} conversationId={conversationId} />}
          </div>

        </div>
      </div>

      <PublishCodeDailoag openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  )
}

export default previewAgent