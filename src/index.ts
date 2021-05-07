import {speedTest} from "./command/speed-test";
import {MongoClient} from "mongodb";


const INSERT_COMPLETED = 1;


main()


function main() {
    const mongoClient = MongoClient.connect('mongodb://192.168.3.192:9017', {useUnifiedTopology: true})

    Promise.all([speedTest(), MongoClient.connect('mongodb://192.168.3.192:9017', {useUnifiedTopology: true})])
        .then(([result, client]) => {
            const resultObject = JSON.parse(result)

            return client.db('speedtest').collection('results').insertOne(resultObject)
        })
        .then(insertResult => {
            if (insertResult.result.ok != INSERT_COMPLETED) throw ''
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            mongoClient.then(client => {
                client.close()
                    .then()
            })
        })
}