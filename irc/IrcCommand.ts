
export class IrcCommand {
    raw = '';
    tags = {};
    prefix: string;
    command: string;
    params = [];

    constructor(data: string) {
        this.raw = data;
        this.parseRaw();
    }

    parseRaw() {
        // Looking for IRCv3.2 tags
        // https://ircv3.net/specs/extensions/message-tags I guess
        let pos = 0;
        let nextspace = 0;
        if (this.raw.charCodeAt(0) === '@'.charCodeAt(0)) {
            nextspace = this.raw.indexOf(' ');
            if (nextspace === -1) return null; // Malformed IRC message

            // Tags are split by a semi colon.
            let rawTags = this.raw.slice(1, nextspace).split(';')
            for (let i = 0; i < rawTags.length; i++) {
                // Tags delimited by an equals sign are key=value tags.
                // If there's no equals, we assign the tag a value of true.
                let tag = rawTags[i];
                let pair = tag.split('=');
                this.tags[pair[0]] = pair[1] || true;
            }

            pos = nextspace + 1;
        }

        // Skip any trailing whitespace.
        while (this.raw.charCodeAt(pos) === ' '.charCodeAt(0))
            pos++;

        // Extract the message's prefix if present.
        // Prefixes are prepended with a colon.
        if (this.raw.charCodeAt(pos) === ':'.charCodeAt(0)) {
            nextspace = this.raw.indexOf(' ', pos);

            // If there's nothing after the prefix...
            if (nextspace === -1) return null; // Malformed IRC message

            this.prefix = this.raw.slice(pos + 1, nextspace);
            pos = nextspace + 1;

            // Skip any trailing whitespace.
            while (this.raw.charCodeAt(pos) === ' '.charCodeAt(0))
                pos++;
        }

        nextspace = this.raw.indexOf(' ', pos);

        // If there's no more whitespace left, extract everything from the
        // current position to the end of the string as the command.
        if (nextspace === -1) {
            if (this.raw.length > pos) {
                this.command = this.raw.slice(pos);
                return this;
            }
            return null;
        }

        // Else, the command is the current position up to the next space. After
        // that, we expect some parameters.
        this.command = this.raw.slice(pos, nextspace);
        pos = nextspace + 1;

        // Skip any trailing whitespace.
        while (this.raw.charCodeAt(pos) === ' '.charCodeAt(0))
            pos++;

        while (pos < this.raw.length) {
            nextspace = this.raw.indexOf(' ', pos)

            // If the character is a colon, we've got a trailing parameter.
            // At this point, there are no extra params, so we push everything
            // from after the colon to the end of the string, to the params array
            // and break out of the loop.
            if (this.raw.charCodeAt(pos) === ':'.charCodeAt(0)) {
                this.params.push(this.raw.slice(pos + 1))
                break
            }

            // If we still have some whitespace...
            if (pos !== -1) {
                // Push whatever's between the current position and the next
                // space to the params array.
                this.params.push(this.raw.slice(pos, nextspace))
                pos = nextspace + 1

                // Skip any trailing whitespace.
                while (this.raw.charCodeAt(pos) === ' '.charCodeAt(0))
                    pos++;

                continue
            }

            // If we don't have any more whitespace and the param isn't trailing,
            // push everything remaining to the params array.
            if (nextspace === -1) {
                this.params.push(this.raw.slice(pos))
                break
            }
        }

    }
}
