type IrcTagValue = string | true;
type IrcTagList = { [name: string]: IrcTagValue };
type IrcParamList = string[];

export class IrcCommand {
    validIrc = false;
    raw: string;

    tags: IrcTagList = {};
    prefix?: string;
    command: string = '';
    params: IrcParamList = [];

    isValid() { return this.validIrc; }

    constructor(data: string | IrcCommand) {
        // Copy constructor
        if (data instanceof IrcCommand) {
            this.raw = data.raw;
            // if (!data.isValid())
            //     data.parseRaw();
            if (data.validIrc) {
                this.tags = data.tags;
                this.prefix = data.prefix;
                this.command = data.command;
                this.params = data.params;
            }
            return;
        }

        this.raw = data;
        this.parseRaw();

        // TODO: Is throwing from constructor ok in JS?
        if (!this.validIrc)
            throw Error("Malformed IRC command")
    }

    parseRaw() {
        // General IRC message format
        // ['@' <tags> <SPACE>] [':' <prefix> <SPACE> ] <command> [params] <crlf>

        const parts = this.raw.trim().match(/^(?:(@\S+)? +)?(?:(:\S+) +)?(\S+) *([^\x0D\x0A\x00]+)?/) || [];
        let tags = parts[0] || false;
        let prefix = parts[1] || false;
        let command = parts[2] || false;
        let params = parts[3] || false;

        if (!command) return; // Malformed, IRC command not found
        // if (!isIrcCmd(command)) return; // Malformed, invalid IRC command

        // Extract IRCv3.2 tags
        // https://ircv3.net/specs/extensions/message-tags
        if (tags) {
            const tagList = tags.match(/^@[^;\s]+|[@;][^;\s]+/g) || [];
            for (const tag of tagList) {
                const tagKV = tag.slice(1).split('=', 2);
                // Unescape tag value
                tagKV[1] = tagKV[1]
                    .replace('\\:', ';')
                    .replace('\\s', ' ')
                    .replace('\\\\', '\\')
                    .replace('\\r', '\r')
                    .replace('\\n', '\n');
                this.tags[tagKV[0]] = tagKV[1];
            }
        }

        // Extract prefix
        if (prefix) {
            this.prefix = prefix.slice(1);
        }

        // Extract command
        this.command = command;

        // Extract params
        if (params) {
            const paramList = params.match(/:[^\x0D\x0A\x00]+|[^\s\x0D\x0A\x00]+/g) || [];
            if (paramList[paramList.length-1].charAt(0) === ':')
                paramList[paramList.length-1] = paramList[paramList.length-1].slice(1);
            this.params = paramList;
        }

        // Done parsing, this command is valid
        this.validIrc = true;
    }
}
