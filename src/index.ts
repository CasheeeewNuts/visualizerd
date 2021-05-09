import {speedTest} from "./command/speed-test";
import {mongoClient, INSERT_COMPLETED} from "./db/mongodb";


main()


function main() {
    let onError: boolean = false

    Promise.all([
        speedTest(),
        mongoClient.connect()
    ]).then(([result, client]) => {
        const resultObject = JSON.parse(result)

        return client.db('speedtest')
                .collection<string>('results')
                .insertOne(resultObject)
    }).then(insertResult => {
        if (insertResult.result.ok !== INSERT_COMPLETED) throw new Error('failed to insert result to mongoDB')

        console.log('test completed!')
    }).catch((err: Error) => {
        onError = true

        console.error(err.message)
    }).finally(() => {
        if (!mongoClient.isConnected()) {
            process.exit(1)
        }

        mongoClient.close().finally(() => {
            console.log('connection closed!')

            if (onError) process.exit(1)

            process.exit(0)
        })
    })
}