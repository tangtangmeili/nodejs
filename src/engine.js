export class engine {
    constructor(rootPath, dc, launchConfig) {
        this.cwd = rootPath;
        this.handlers = {};
        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        })
    }

    async handleEvent(eventName, argument1, argument2, details) {
        try {
            for (let key of Object.keys(this.handlers)) {
                const reg = utils.wildcardToRegex(key);
                if (reg.exec(eventStr)) {
                    const res = this.handlers[key](eventName, argument1, argument2, details);
                    if (res) {
                        await Promise.resolve(res);
                    }
                }
            }
        }
    }
}