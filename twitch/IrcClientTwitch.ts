import {IrcClientWS} from './irc/IrcClientWS'

export class IrcClientTwitch extends IrcClientWS {

    channel: string;

    constructor(channel: string) {
        super('wss://irc-ws.chat.twitch.tv', { reconnectInterval: 2000 }, {
            onopen: function(ws) {
                // console.log('IrcClientTwitch: Connected to #' + channel);
                ws.send('PASS blah\r\n');
                ws.send('NICK justinfan' + Math.floor(Math.random() * 99999) + '\r\n');
                ws.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
                ws.send('JOIN #' + channel + '\r\n');
            }
        });
        this.channel = channel;

    }

}

