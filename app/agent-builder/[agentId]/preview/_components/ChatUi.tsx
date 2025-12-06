import React, { useState } from "react";
import { Loader2, RefreshCcw, Send } from "lucide-react";
import { Agent } from "@/types/AgentType";
import { Button } from "@/components/ui/button";
import Markdown from 'react-markdown'

type Props = {
  generateAgentToolConfig: () => void,
  loading: boolean,
  agentDetail: Agent,
  conversationId: string
}

function ChatUi({ generateAgentToolConfig, loading, agentDetail, conversationId }: Props) {
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);

  const OnSendMsg = async () => {
    setLoadingMsg(true);

    setMessages([...messages, { role: 'user', content: userInput }]);
    setUserInput('');
    const result = await fetch('/api/agent-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentName: agentDetail?.name,
        agents: agentDetail?.config?.agents || [],
        tools: agentDetail?.config?.tools || [],
        input: userInput,
        conversationId: conversationId,

      }),
    })

    if (!result.body) return;

    const reader = result.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value);
        console.log(chunk);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: (updated[updated.length - 1]?.content || "") + chunk
          }
          return updated;
        });
      }
    }
    setLoadingMsg(false);
  }

  return (
    <div className="w-full h-[80vh] p-4 flex flex-col border rounded-xl bg-white">

      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-lg font-semibold">{agentDetail?.name}</h2>

        <button
          onClick={generateAgentToolConfig}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <RefreshCcw className={`${loading && "animate-spin"}`} />
          Reboot Agent
        </button>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">

        {messages.map((message, index) => {
          return (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="p-2 rounded-lg max-w-[80%] bg-gray-300 text-black">
                {/* <p className="text-sm">{message.content}</p> */}
                <div className="text-sm text-black ">
                  <Markdown>{message?.content}</Markdown>
                </div>
              </div>
            </div>
          )
        })}

        {/* <div className="flex justify-start">
          <div className="p-2 rounded-lg max-w-[80%] bg-gray-300 text-black">
            <p className="text-sm">Welcome! This is a demo chat.</p>
          </div>
        </div>

        {/* User Message */}
        {/* <div className="flex justify-end">
          <div className="p-2 rounded-lg max-w-[80%] bg-gray-100 text-black">
            <p className="text-sm">Hello! Can you show me a design idea?</p>
          </div>
        </div> */}

        {/* Loading Typing Indicator */}
        {loadingMsg && (
          <div className="flex justify-center items-center gap-2 p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-800"></div>
            <span className="text-sm text-zinc-600">
              Thinking... Working on your request
            </span>
          </div>
        )}

      </div>

      {/* Footer Input */}
      <div className="p-4 border-t flex items-center gap-2">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="p-3 border rounded-lg flex-1 resize-none outline-none text-sm"
          placeholder="Type your message..."
        ></textarea>
        <Button onClick={OnSendMsg} disabled={loadingMsg || !userInput.trim().length}>
          {loadingMsg ? <Loader2 className="animate-spin" /> : <Send />}
        </Button>
      </div>
    </div>
  );
}

export default ChatUi;
