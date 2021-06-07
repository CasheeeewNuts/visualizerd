import 'module-alias/register'
import {SpeedTest} from "@app/command/speed-test";
import {Repository} from "@app/infra/repository/repository";
import {SpeedTestResultRepository} from "@app/infra/repository/speed-test-result/speed-test-result-repository";
import {SpeedtestResult} from "@model/speedtest-result";
import {Platform} from "@app/console/platform";

export function main() {
    const platform: Platform = new Platform(process.platform)
    const speedTest: SpeedTest<StoredSpeedtestResult> = new SpeedTest<StoredSpeedtestResult>(platform);
    const repository: Repository<StoredSpeedtestResult> = new SpeedTestResultRepository<StoredSpeedtestResult>();

    Promise.all([
        speedTest.exec(resultToStoredSpeedTestResult),
        repository.connect()
    ]).then(([result, repo]) => {
        return repo.store(result)
    }).then(storeResult => {
        if (!storeResult) throw new Error('failed to insert result to mongoDB')
    }).catch((err: Error) => {
        console.error(err.message)
    }).finally(() => {
        repository.close()
    })
}

function resultToStoredSpeedTestResult(stdout: string): StoredSpeedtestResult {
    const result = JSON.parse(stdout) as SpeedtestResult

    return {
        ping: result.ping.latency,
        download: result.download.bandwidth,
        upload: result.download.bandwidth,
        isp: result.isp,
        macAddress: result.interface.macAddr
    }
}