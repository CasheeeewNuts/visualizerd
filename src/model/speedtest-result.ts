export interface SpeedtestResult {
    type: string,
    ping: Ping,
    download: Download,
    upload: Upload,
    packetLoss: number,
    isp: string,
    interface: Interface,
    server: Server
    timestamp: string,
}


interface Ping {
    jitter: number,
    latency: number
}


interface Download {
    bandwidth: number,
    bytes: number,
    elapsed: number
}


interface Upload {
    bandwidth: number,
    bytes: number,
    elapsed: number
}


interface Interface {
    internalIp: string,
    externalIp: string,
    name: string,
    isVpn: boolean,
    macAddr: string
}


interface Server {
    id: number,
    name: string,
    location: string,
    country: string,
    host: string,
    port: number,
    ip: string
}


interface Result {
    id: string,
    url: string
}