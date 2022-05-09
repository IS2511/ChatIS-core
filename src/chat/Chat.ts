'use strict';

import { Settings, UserSettings, DefaultSettings } from './settings';
// import { IrcLine } from "../twitch/irc/IrcLine";

class Chat {
    socket = null;

    settings: Settings = DefaultSettings;

    constructor(settings) {
        if (settings) Object.assign(this.settings, settings);
    }

    connect(channel: string) {
        channel = channel.toLowerCase()

        let socket = new ReconnectingWebSocket('wss://irc-ws.chat.twitch.tv', 'irc', { reconnectInterval: 2000 });

        socket.onopen = function() {
            console.log('[ChatIS] Connected to twitch');
            socket.send('PASS blah\r\n');
            socket.send('NICK justinfan' + Math.floor(Math.random() * 99999) + '\r\n');
            socket.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
            socket.send('JOIN #' + channel + '\r\n');
        };

        socket.onclose = function() {
            console.log('[ChatIS] Disconnected');
        };

        socket.onmessage = function(data) {
            data.data.split('\r\n').forEach(line => {
                if (!line) return;
                let ircCommand = new IrcCommand(line);
                if (ircCommand) Chat.newMessage(ircCommand);
            });
        }

        this.socket = socket;
    }

    static newMessage(msg: IrcCommand) {


    }
}

export { Chat };