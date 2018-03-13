export declare class client extends ProtocolClient{
    private _runtime;
    private _executable;
    private _adapterProcess;
    private _spawnOptions;
    constructor(runtime:string,executable:string,debugType:string)

    start(port?:number):Promise<void>;
    initializeRequest:Promise<DebugProtocol.ConfigurationDoneResponse>;
    
}