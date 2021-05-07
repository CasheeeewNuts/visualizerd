import {exec, execSync} from "child_process";

type SUPPORTING_PLATFORM = 'linux' | 'darwin'
const PLATFORM = process.platform;

export function speedTest() {
    const command = '/usr/bin/env speedtest --json'

    return new Promise<string>((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            }

            return resolve(stdout)
        })
    })
}