import {exec} from "child_process";
import {NotSupportingOSError} from "../error/NotSupportingOSError";
import * as Platform from "../console/platform";


type Command = {
    [key in typeof Platform.SUPPORTING_PLAT_FORM[number]]: string
};

// const command: Command = {
//     linux: '/usr/bin/env speedtest -f json',
//     darwin: '/usr/bin/env speedtest --json'
// }
//
//
// export function speedTest() {
//     if (!Platform.isSupported(Platform.PLAT_FORM)) throw new NotSupportingOSError()
//
//     return new Promise<string>((resolve, reject) => {
//         exec(command[Platform.PLAT_FORM], (err, stdout, stderr) => {
//             if (err) {
//                 reject(new Error(stderr))
//             }
//
//             return resolve(stdout)
//         })
//     })
// }


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