import { cleanLLMOutput } from "./utils.js";

export const GetScriptFromLLM = async (userPrompt: string) => {
    const response = await fetch('http://localhost:11434/api/generate',{
        method: 'POST',
        body: JSON.stringify({
            model: 'deepseek-r1:14b',
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
    const script = data.response.trim();
    let cleanedScript = cleanLLMOutput(script)
    return cleanedScript
}