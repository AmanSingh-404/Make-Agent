import { NextRequest } from "next/server";
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api";
import { GetConversationById } from "@/convex/conversation";
import { openai } from "@/config/OpenAiModel";
import z from "zod";
import { Agent, run, tool } from "@openai/agents";



// import openai from "openai";
export async function POST(req: NextRequest) {
    const { userId, agentId, userInput } = await req.json();

    const agentDetail = await fetchQuery(api.agent.GetAgentById, {
        agentId: agentId
    });

    //check if conversation exists
    let conversationId_ = null;
    const conversationDetail = await fetchQuery(api.conversation.GetConversationById, {
        agentId: agentId,
        userId: userId
    });

    conversationId_=conversationDetail?.conversationId;
    if(!conversationDetail.conversationId){
        const {id: conversationId} = await openai.conversations.create({});
        conversationId_=conversationId;
        
    }


    const generatedTools = agentDetail?.agentToolConfig?.tools?.map((t: any) => {
                // Dynamically build zod object for parameters
                const paramSchema = z.object(
                    Object.fromEntries(
                        Object.entries(t.parameters).map(([key, type]) => {
                            if (type === "string") return [key, z.string()];
                            if (type === "number") return [key, z.number()];
                            return [key, z.any()];
                        })
                    )
                );
    
                return tool({
                    name: t.name,
                    description: t.description,
                    parameters: paramSchema,
                    async execute(params: Record<string, any>) {
                        // Replace placeholders in URL
                        let url = t.url;
                        for (const key in params) {
                            url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
                        }
    
                        if (t.includeApiKey && t.apiKey) {
                            url += url.includes("?")
                                ? `&key=${t.apiKey}`
                                : `?key=${t.apiKey}`;
                        }
    
                        // Make API request
                        const response = await fetch(url);
                        const data = await response.json();
                        // console.log(data);
    
                        // Return raw data (or transform if needed)
                        return data;
                    }
                });
            });
    
            // Force OpenRouter Configuration for @openai/agents
            process.env.OPENAI_BASE_URL = "https://openrouter.ai/api/v1";
            process.env.OPENAI_API_KEY = process.env.OPENROUTER_API_KEY;
    
            const createAgents = agentDetail?.agentToolConfig?.agents?.map((config: any) => {
                return new Agent({
                    name: config?.name,
                    instructions: config?.instructions,
                    model: 'openai/gpt-4o-mini', // Explicitly set model
                    tools: generatedTools,
                })
            })
    
            // Ensure agentName is present or provide a default
            const finalAgentName = agentDetail?.name || "Primary Agent";
    
            const finalAgent = Agent.create({
                name: finalAgentName,
                instructions: 'You determine which agent to use based on the user query',
                model: 'openai/gpt-4o-mini', // Explicitly set model
                handoffs: createAgents,
            })
            const result = await run(finalAgent, userInput, {
                conversationId: conversationId_,
                stream: true,
    
            })
    
            const stream = result.toTextStream();
            // @ts-ignore
            return new Response(stream);

    // return new Response(JSON.stringify({ agentDetail, conversationDetail }), { status: 200 });
}