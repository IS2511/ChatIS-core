import {IrcClientRaw} from './IrcClientRaw'
import {ReconnectingWebSocket} from './ReconnectingWebSocket';

type WSCallbackName = 'onopen' | 'onmessage' | 'onclose' | 'onerror';
type WSCallback = (ws: ReturnType<typeof ReconnectingWebSocket>) => void;
type WSCallbackList = {
    [cmd in WSCallbackName]?: WSCallback | null;
};

export class IrcClientWS extends IrcClientRaw {
    ws: ReturnType<typeof ReconnectingWebSocket>;

    constructor(url: string, params?: any, wsCallbacks?: WSCallbackList) {
        super();
        let ws = ReconnectingWebSocket(url, 'irc', params);

        ws.onopen = function() {
            // console.log('ChatIS: Connected to #' + channel);
            // ws.send('PASS blah\r\n');
            // ws.send('NICK justinfan' + Math.floor(Math.random() * 99999) + '\r\n');
            // ws.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
            // ws.send('JOIN #' + channel + '\r\n');
            if (wsCallbacks && wsCallbacks.onopen) wsCallbacks.onopen(ws);
        };

        const handle = this.handle;
        ws.onmessage = function(event) {
            (event.data as string).split('\r\n').forEach(line => {
                if (!line) return;
                handle(line);
            });
            if (wsCallbacks && wsCallbacks.onmessage) wsCallbacks.onmessage(ws);
        };

        ws.onclose = function () {
            // Nothing
            if (wsCallbacks && wsCallbacks.onclose) wsCallbacks.onclose(ws);
        }

        ws.onerror = function (event) {
            console.log('IrcClientWS socket error: ', event);
            if (wsCallbacks && wsCallbacks.onerror) wsCallbacks.onerror(ws);
        }

        this.ws = ws;
    }

}
