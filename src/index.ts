import {speedTest} from "./command/speed-test";
import {MongoClient} from "mongodb";


const INSERT_COMPLETED = 1;


main()


function main() {
    let mongoClient: MongoClient
    let onError: boolean = false

    Promise.all([
        speedTest(),
        MongoClient.connect('mongodb://192.168.3.192:8017', {useUnifiedTopology: true})
    ]).then(([result, client]) => {
        mongoClient = client
        const resultObject = JSON.parse(result)

        return client.db('speedtest').collection<string>('results').insertOne(resultObject)
    }).then(insertResult => {
        if (insertResult.result.ok != INSERT_COMPLETED) throw new Error('error')

        console.log('test completed!')
    }).catch((err: Error) => {
        onError = true
        console.error(err.message)
    }).finally(() => {
        if (mongoClient == null) {
            process.exit(1)
        }

        mongoClient.close().finally(() => {
            console.log('connection closed!')

            if (onError) process.exit(1)

            process.exit(0)
        })
    })
}