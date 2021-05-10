import {speedTest} from "./app/command/speed-test";
import {mongoClient, INSERT_COMPLETED} from "./db/mongodb";


export {main}


function main() {
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
        console.error(err.message)
    }).finally(mongoClient.close)
}