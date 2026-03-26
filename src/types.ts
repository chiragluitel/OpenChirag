export interface BotAction {
    action: "OPEN_APP" | "CLOSE_APP" | "SEARCH_WEB" | "UNKNOWN";
    target: string
}