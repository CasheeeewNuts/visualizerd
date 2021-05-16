import {SpeedTest} from "./app/command/speed-test";
import {Repository} from "./app/infra/repository/repository";
import {SpeedTestResultRepository} from "./app/infra/repository/speed-test-result/speed-test-result-repository";


export function main() {
    const speedTest: SpeedTest<number> = new SpeedTest<number>();
    const repository: Repository<any> = new SpeedTestResultRepository();

    Promise.all([
        speedTest.exec(JSON.parse),
        repository.connect()
    ]).then(([result, repo]) => {
        return repo.store(result)
    }).then(storeResult => {
        if (!storeResult) throw new Error('failed to insert result to mongoDB')
    }).catch((err: Error) => {
        console.error(err.message)
    }).finally(() => {
        repository.close().finally()
    })
}