import { GenerateEmailTemplateAIModel } from "@/config/AIModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
    const aiResp = result.response.text();

    return NextResponse(aiResp);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
