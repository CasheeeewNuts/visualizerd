import {exec} from "child_process";
import {NotSupportingOSError} from "../error/NotSupportingOSError";


const SUPPORTING_PLATFORMS = ['linux', 'darwin'] as const
type SUPPORTING_OS = typeof SUPPORTING_PLATFORMS[number]
const PLATFORM: NodeJS.Platform = process.platform;

type Command = {
    [key in SUPPORTING_OS]: string
};

const command: Command = {
    linux: '/usr/bin/env speedtest -f json',
    darwin: '/usr/bin/env speedtest --json'
}


export function speedTest() {
    if (!isSupportingOS(PLATFORM)) throw new NotSupportingOSError()

    return new Promise<string>((resolve, reject) => {
        exec(command[PLATFORM], (err, stdout, stderr) => {
            if (err) {
                reject(new Error(stderr))
            }

            return resolve(stdout)
        })
    })
}


function isSupportingOS(platform: any): platform is SUPPORTING_OS {
    return SUPPORTING_PLATFORMS.includes(platform)
}