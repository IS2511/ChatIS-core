import TwitchClient from "./TwitchClient";
import IrcClient from './irc/IrcClient'

export class TwitchClientIrc extends TwitchClient {
    private _client: IrcClient;

    constructor(ircClient: IrcClient, channel: string) {
        super(channel);
        this._client = ircClient;

        this._client.on('open', (event) => {
            console.log('ChatIS-core: Connected to #' + channel);
            event.target.send('PASS blah\r\n');
            event.target.send('NICK justinfan' + Math.floor(Math.random() * 99999) + '\r\n');
            event.target.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
            event.target.send('JOIN #' + channel + '\r\n');
            return true;
        });
    }

}

