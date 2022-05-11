
export default class TwitchUser {
    username: string;
    displayName: string;
    color: string;


    constructor(username: string, displayName?: string, color?: string) {
        this.username = username;
        this.displayName = displayName;
        this.color = color;

        if (TwitchUser.getCached(username))
            TwitchUser._cache[username] = this;
    }


}