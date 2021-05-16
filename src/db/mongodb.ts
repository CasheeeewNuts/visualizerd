import {MongoClient, MongoClientOptions} from "mongodb";
import "dotenv/config"


const {DB_HOST, DB_PORT, DB_USER_NAME, DB_PASSWORD} = process.env
const INSERT_COMPLETED = 1;

const clientOptions: MongoClientOptions = {
    useUnifiedTopology: true
}

if (DB_HOST == null || DB_PORT == null) throw new Error()
const connectionURI = buildConnectionURI(DB_HOST, DB_PORT, DB_USER_NAME, DB_PASSWORD)

const mongoClient = new MongoClient(connectionURI, clientOptions)
function createClient() {
    return new MongoClient(connectionURI, clientOptions)
}


export {createClient, mongoClient, INSERT_COMPLETED}


function buildConnectionURI(host: string, port: string, userName?: string, password?: string) {
    if (userName == null || userName.length === 0 || password == null || password.length === 0) {
        return `mongodb://${host}:${port}`
    }

    const credential = `${userName}:${password}`

    return `mongodb://${credential}@${host}:${port}`

}


