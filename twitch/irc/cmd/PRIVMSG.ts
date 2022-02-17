
class PRIVMSG {
    valid = false;

    channel = '';
    message = '';

    constructor(command: string) {
        let r = command.trim().match(/^PRIVMSG #([^#:\s]+) :([^#:\s]+)/);
        if (r && r[0] && r[1]) {
            this.channel = r[0];
            this.message = r[1];
            this.valid = true;
        }
    }

    getChannel() { return this.channel; }
    getMessage() { return this.message; }

}
