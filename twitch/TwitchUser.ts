
type TwitchUserCache = { [username: string]: TwitchUser };

export class TwitchUser {
    static _cache: TwitchUserCache = {};
    static getCached(username: string) { return this._cache[username] || false; };

    username: string;
    displayName: string;
    color: string;

    constructor(username: string, displayName: string, color: string) {
        this.username = username;
        this.displayName = displayName;
        this.color = color;

        if (TwitchUser.getCached(username))
            TwitchUser._cache[username] = this;
    }


}