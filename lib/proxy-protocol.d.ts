export declare enum INETProtocol {
    TCP4 = "TCP4",
    TCP6 = "TCP6",
    UNKNOWN = "UNKNOWN"
}
export declare class Host {
    readonly ipAddress: string;
    readonly port: number;
    constructor(ipAddress: string, port: number);
}
export interface ProxyProtocol {
    build(): string;
}
export declare class V1ProxyProtocol implements ProxyProtocol {
    private readonly inetProtocol;
    private readonly source;
    private readonly destination;
    private readonly data?;
    private static readonly v1ProxyProtocolRegexp;
    constructor(inetProtocol: INETProtocol, source: Host, destination: Host, data?: string | undefined);
    build(): string;
    static parse(text: string): V1ProxyProtocol | null;
}
