import IrcClient from './IrcClient'
import ReconnectingWebSocket, {UrlProvider,Options} from 'reconnecting-websocket/reconnecting-websocket';


export default class IrcClientWS extends IrcClient {
    private _ws: ReconnectingWebSocket;

    constructor(url: UrlProvider, options: Options = {}) {
        super();
        this._ws = new ReconnectingWebSocket(url, 'irc', options);

        this._ws.addEventListener('open', function(event) {
            // const ws = (event.target as ReconnectingWebSocket);
        });

        const receive = this.receive;
        this._ws.addEventListener('message', function(event) {
            (event.data as string).split('\r\n').forEach(line => {
                if (!line) return;
                receive(line);
            });
        });

        this._ws.addEventListener('close', function(event) {
            // Nothing
        });

        this._ws.addEventListener('error', function(event) {
            console.log('IrcClientWS socket error: ', event);
        });
    }

}
