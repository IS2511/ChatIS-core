import {IrcCommand} from './IrcCommand';

type IrcCmdCallback = (cmd: IrcCommand) => boolean;
type IrcCmdCallbackList = {
    [cmd: string]: IrcCmdCallback | null;
};

export class IrcClientRaw {

    cb: IrcCmdCallbackList = {};

    constructor() {
    }

    handle(data: string): boolean {
        const cmd = new IrcCommand(data);
        if (!cmd.isValid()) return false;

        if (typeof(this.cb[cmd.command]) === 'function') {
            return (this.cb[cmd.command] as IrcCmdCallback)(cmd);
        } else if (typeof(this.cb['any']) === 'function') {
            return this.cb['any'](cmd);
        } else
            return false;
        // return true;
    }

    on(callback: IrcCmdCallback | null, cmd?: string) {
        if (cmd)
            this.cb[cmd] = callback;
        else
            this.cb['any'] = callback;
    }

}
