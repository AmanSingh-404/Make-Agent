import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `
From this flow, generate an agent instruction prompt and all agent tools with all setting info in JSON format.

📌 Rules
- Respond ONLY with a valid JSON object.
- Do NOT include any explanations or comments outside JSON.
- Follow the exact structure below — do not change field names.

{
  "systemPrompt": "",
  "primaryAgentName": "",
  "agents": [
    {
      "id": "",
      "name": "",
      "instruction": "",
      "tools": ["tool-id"]
    }
  ],
  "tools": [
    {
      "id": "",
      "name": "",
      "description": "",
      "method": "GET | POST | PUT | PATCH | DELETE",
      "url": "",
      "includeApiKey": true,
      "apiKey": "",
      "parameters": [
        {
          "name": "",
          "in": "path | query | header | body",
          "required": true,
          "schema": {
            "type": "string | number | boolean | object | array"
          }
        }
      ]
    }
  ],
  "output": ""
}
`;

export async function POST(request: NextRequest) {

  const { jsonConfig } = await request.json();

  let response;
  try {
    response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant that generates agent configurations in JSON format.'
        },
        {
          role: 'user',
          content: JSON.stringify(jsonConfig) + PROMPT
        }
      ]
    });
  } catch (error: any) {
    console.error("OpenRouter API Error:", error);
    return NextResponse.json({ error: "OpenRouter API Error", details: error.message }, { status: 500 });
  }

  const outpotText = response.choices[0].message.content;

  if (!outpotText) {
    return NextResponse.json({ error: "No response from OpenAI" }, { status: 500 });
  }

  let parsedJson;
  try {
    parsedJson = JSON.parse(outpotText.replace('```json', '').replace('```', ''));
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse JSON response" }, { status: 500 });
  }

  return NextResponse.json(parsedJson);
}