import {exec} from "child_process";
import {Platform} from "@app/console/platform";
import {NotSupportingOSError} from "@app/error/NotSupportingOSError";


type Command = {
    [key in typeof Platform.supporting[number]]: string
};


export class SpeedTest<T> {
    private static command: Command = {
        linux: '/usr/bin/env speedtest -f json',
    } as const

    private platform: Platform;
    public constructor(platform: Platform) {
        this.platform = platform
    }

    public exec(): Promise<string>
    public exec(pipe: (input: string) => T): Promise<T>
    public exec(pipe?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.platform.isSupported()) throw new NotSupportingOSError

            exec(SpeedTest.command[this.platform.platform as 'linux'], (err, stdout, stderr) => {
                if (err) reject(new Error(stderr))

                return pipe != null
                        ? resolve(pipe(stdout))
                        : resolve(stdout);
            })
        })
    }
}