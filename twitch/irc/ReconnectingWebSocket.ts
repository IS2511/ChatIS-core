let loaded = false;
if (this === window) { // If running in browser
    if (!('ReconnectingWebSocket' in window)) // Check if it's loaded globally
        loaded = true;
}
if (!loaded) throw Error('ReconnectingWebSocket not found! Load it before this module please');


// Helper declares to describe ReconnectingWebSocket types using TS

export declare interface ReconnectingWebSocketType extends WebSocket {
    // Log debug messages
    debug: boolean
    // Connect immediately upon instantiation
    automaticOpen: boolean
    // The number of milliseconds to delay before attempting to reconnect
    reconnectInterval: number
    // The maximum number of milliseconds to delay a reconnection attempt
    maxReconnectInterval: number
    // The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist
    reconnectDecay: number
    // The maximum time in milliseconds to wait for a connection to succeed before closing and retrying
    timeoutInterval: number
    // The maximum number of reconnection attempts to make. Unlimited if null
    maxReconnectAttempts: number | null
    // The binary type, possible values 'blob' or 'arraybuffer', default 'blob'
    binaryType: 'blob' | 'arraybuffer'

    reconnectAttempts: number
}

export declare interface ReconnectingWebSocketFn {
    (url: string | URL, protocols?: string | string[], params?: any): ReconnectingWebSocketType
    debugAll: boolean
}


// If it's loaded externally, return the loaded function with TS typings
// @ts-ignore guarded (loaded = true)
let ReconnectingWebSocket = this.ReconnectingWebSocket as ReconnectingWebSocketFn;
export {ReconnectingWebSocket};
