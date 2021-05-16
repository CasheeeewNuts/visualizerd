import {exec} from "child_process";
import {NotSupportingOSError} from "../error/NotSupportingOSError";
import * as Platform from "../console/platform";


type Command = {
    [key in typeof Platform.SUPPORTING_PLAT_FORM[number]]: string
};


class SpeedTest<T> {
    private command: Command = {
        linux: '/usr/bin/env speedtest -f json',
        darwin: '/usr/bin/env speedtest --json'
    } as const


    public exec(pipe?: (stdout: string) => T): Promise<T | string> {
        return new Promise<T | string>((resolve, reject) => {
            exec(this.command['darwin'], (err, stdout, stderr) => {
                if (err) reject(new Error(stderr))

                return pipe != null
                        ? resolve(pipe(stdout))
                        : resolve(stdout);
            })
        })
    }
}

export {SpeedTest}