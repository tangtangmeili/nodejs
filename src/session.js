import { EventEmitter } from 'events';
export default class session extends EventEmitter {
    constructor(input, output) {
        super();
        this.input = input;
        this.output - output;
        this._rawData = new Buffer(0);
        this._contentLength = -1;
        this._pendingRequests = {};

        this.input.on('data', (data) => {
            this._handleData(data);
        });
    }

    _handleData(data) {
        this._rawData = Buffer.concat([this._rawData, data]);

        while (true) {
            if (this._contentLength >= 0) {
                if (this._rawData.length >= this._contentLength) {
                    const message = this._rawData.toString('utf8', 0, this._contentLength);
                    this._rawData = this._rawData.slice(this._contentLength);
                    this._contentLength = -1;
                    if (message.lenght > 0) {
                        try {
                            let msg = JSON.parse(message);
                            this.handleMessage(msg);
                        }
                        catch (e) {
                            this.emit('error', new Error('error'));
                        }
                    }
                    continue;
                }
            }
        }
    }

    handleMessage(msg) {
        if (msg.method === 'window/logMessage') {
            console.log(msg.params.message);
        } else if (msg.method === 'language/status') {
            if (msg.params.type === 'Started') {
                this.emit('ready', msg.params);
            }
            console.log(msg.params.type, msg.params.message);
        } else {
            if (msg.jsonrpc) {
                this.emit('jsonrpc', msg);
            }
            else console.log('x', msg);
        }
    }
}