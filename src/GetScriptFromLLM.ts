import type { BotAction } from "./types.js";
import { cleanLLMOutput } from "./utils.js";

export const GetScriptFromLLM = async (userPrompt: string) => {
    const response = await fetch('http://localhost:11434/api/generate',{
        method: 'POST',
        body: JSON.stringify({
            model: 'deepseek-r1:14b',
            format: 'json',
            system: "You are a MacOS command-line generator. " + 
            "Return ONLY the valid AppleScript code requested. " + 
            "NO markdown, NO explanations, NO 'think' tags, NO quotes. " + 
            "Example: tell application \"Google Chrome\" to activate",
            prompt: userPrompt,
            stream: false,
            options: {
                temperature: 0
            }
        })
    } )

    const data = await response.json();
    const RawResponse = data.response;
    
    const jsonMatch = RawResponse.match(/\{[\s\S]*\}/)

    if(!jsonMatch) throw new Error ("LLM Failed to Return JSON")

    return JSON.parse(jsonMatch[0]) as BotAction;
}