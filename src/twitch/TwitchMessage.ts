import {IrcLine} from './irc/IrcLine';
// import {Md5} from 'ts-md5/src/md5';

// TODO: This is garbage, do something with these lists
export type IrcBasicCmd = 'PING' | 'JOIN' | 'PART' | 'PRIVMSG';
export type TwitchIrcCmd = 'PING' | 'JOIN' | 'CLEARMSG' | 'CLEARCHAT' | 'PRIVMSG';
const IrcCmdList: { [cmd in IrcCmd]: true } = {
    'PING': true,
    'JOIN': true,
    'CLEARMSG': true,
    'CLEARCHAT': true,
    'PRIVMSG': true
};

type TwitchBadgeVersion = number;
type TwitchBadgeList = { [key: string]: TwitchBadgeVersion }

interface PING {
    channel: string;
}
interface JOIN {
    channel: string;
}
interface CLEARMSG {
    username: string;
    targetMsgId: string;
    channel: string;
    message: string;
}
interface CLEARCHAT {
    username?: string;
    timeoutSeconds?: number;
    channel: string;
}
interface PRIVMSG {
    badges: TwitchBadgeList;
    username: string;
    userId?: number;
    displayName: string;
    color: string;
    channel: string;
    message: string;
}

let twitchColorList = [
    "#FF0000", "#0000FF", "#008000",
    "#B22222", "#FF7F50", "#9ACD32",
    "#FF4500", "#2E8B57", "#DAA520",
    "#D2691E", "#5F9EA0", "#1E90FF",
    "#FF69B4", "#8A2BE2", "#00FF7F"
];

export class TwitchMessage<CMD> extends IrcCommand {
    validTwitch = false;


    isValid() { return this.validIrc && this.validTwitch; }

    constructor(data: string | IrcCommand) {
        super(data);

        switch (this.command) {
            // TODO: All these
            case "PING":
                // socket.send('PONG ' + message.params[0]);
                return;
            case "JOIN":
                // console.log('ChatIS: Joined channel #' + channel);
                return;
            case "CLEARMSG":
                // if (message.tags) Chat.clearMessage(message.tags['target-msg-id']);
                return;
            case "CLEARCHAT":
                // if (message.params[1]) Chat.clearChat(message.params[1]);
                return;

            case 'PRIVMSG': {
                if (this.prefix) {
                    let username = this.prefix.split('@')[0].split('!')[0];
                    if (username)
                        this.username = username;
                    else throw Error('Empty username');
                } else throw Error('No prefix (no username)');

                if (this.tags.badges && this.tags.badges !== true) {
                    for (const badge in this.tags.badges.split(',')) {
                        const v = badge.split('/');
                        // v[0] is badge name, and v[1] is badge version
                        this.badges[v[0]] = parseInt(v[1], 10);
                    }
                }

                if (this.badges.color) {
                    this.color = '#' + this.badges.color;
                } else {
                    let sum = 0;
                    for (let i = 0; i < this.username.length; i++)
                        sum += this.username.charCodeAt(i) * i;
                    this.color = twitchColorList[sum % twitchColorList.length];
                    // this.color = Md5.hashAsciiStr(this.username, true)[3];
                }

                if (this.tags['display-name'] && this.tags['display-name'] !== true)
                    this.displayName = this.tags['display-name'];
                else
                    this.displayName = this.username;

                if (this.tags['user-id'] && this.tags['user-id'] !== true)
                    this.userId = parseInt(this.tags['user-id'], 10);
                else
                    this.userId = -1;

                if (this.params[0] && this.params[0].charAt(0) === '#')
                    this.channel = this.params[0].slice(1);
                else throw Error('No channel param');

                if (this.params[1])
                    this.message = this.params[1];
                else throw Error('No message param');

            } break;
        }

        this.validTwitch = true;
    }


}