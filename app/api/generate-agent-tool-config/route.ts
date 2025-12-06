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

    const {jsonConfig} = await request.json();

    const response = await openai.responses.create({
        model:'gpt-4.1-mini',
        input:JSON.stringify(jsonConfig)+PROMPT,
    })

    const outpotText = response.output_text;
    let parsedJson;
    try {
        parsedJson = JSON.parse(outpotText.replace('```json', '').replace('```', ''));
    } catch (error) {
        return NextResponse.json({error:error});
    }
    
    return NextResponse.json(parsedJson);
}