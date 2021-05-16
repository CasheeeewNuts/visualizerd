import {exec} from "child_process";
import {Platform} from "../console/platform";
import {NotSupportingOSError} from "../error/NotSupportingOSError";


type Command = {
    [key in typeof Platform.supporting[number]]: string
};


export class SpeedTest<T> {
    private static command: Command = {
        linux: '/usr/bin/env speedtest -f json',
        darwin: '/usr/bin/env speedtest --json'
    } as const


    public exec(): Promise<string>
    public exec(pipe: (input: string) => T): Promise<T>
    public exec(pipe?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const platform = new Platform(process.platform)
            if (!platform.isSupported()) throw new NotSupportingOSError

            exec(SpeedTest.command[platform.platform as 'linux' | 'darwin'], (err, stdout, stderr) => {
                if (err) reject(new Error(stderr))

                return pipe != null
                        ? resolve(pipe(stdout))
                        : resolve(stdout);
            })
        })
    }
}