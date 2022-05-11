import TwitchUser from "./TwitchUser";

type TwitchUserCache = { [username: string]: TwitchUser };

export default class TwitchClient {
    channel: string;

    // static _userCache: TwitchUserCache = {};
    // static getCached(username: string) { return this._cache[username] || false; };

    constructor(channel: string) {
        this.channel = channel;

    }

}
