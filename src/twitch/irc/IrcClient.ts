import IrcLine, {IrcCommand} from './IrcLine';

export class IrcCmdEvent {
    public target: IrcClient;
    public data: IrcLine;
    constructor(data: IrcLine, target: IrcClient) {
        this.target = target;
        this.data = data;
    }
}

type IrcCmdCallback = (event: IrcCmdEvent) => boolean;
type IrcCmdCallbackList = {
    [cmd: IrcCommand]: IrcCmdCallback;
};
type IrcLineOrString = string | IrcLine;

export default class IrcClient {
    private _cb: IrcCmdCallbackList = {};
    // private _sendQueue: Array<IrcLineOrString> = [];

    constructor() {
    }

    on(cmd: IrcCommand | 'any', callback?: IrcCmdCallback) {
        if (callback)
            this._cb[cmd] = callback;
        else
            delete this._cb[cmd];
    }

    // Raw client, use this in implementation
    receive(cmd: IrcLineOrString): boolean {
        if (typeof(cmd) === 'string')
            cmd = new IrcLine(cmd);
        if (!cmd.isValid()) return false;

        if (typeof(this._cb[cmd.command]) === 'function') {
            return (this._cb[cmd.command] as IrcCmdCallback)(new IrcCmdEvent(cmd, this));
        } else if (typeof(this._cb['any']) === 'function') {
            return this._cb['any'](new IrcCmdEvent(cmd, this));
        } else
            return false;
    }

    // Raw client, override this in implementation
    send(cmd: IrcLineOrString): boolean {
        return false;
    }

}


