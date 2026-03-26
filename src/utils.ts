export const cleanLLMOutput = (rawText: string): string => {
    return rawText
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/```[a-z]*\n([\s\S]*?)\n```/gi, '$1')
    .replace(/`([^`]+)`/g, '$1')
    ?.trim();
}