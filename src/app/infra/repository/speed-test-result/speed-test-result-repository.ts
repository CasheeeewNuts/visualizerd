import {MongoClient} from "mongodb";
import {Repository} from "@app/infra/repository/repository";
import {createClient, INSERT_COMPLETED} from "@db/mongodb";


export class SpeedTestResultRepository<T> implements Repository<T> {
    private readonly client: MongoClient;


    constructor() {
        this.client = createClient();
    }


    async connect(): Promise<this> {
        await this.client.connect()

        return this;
    }


    async store(result: T): Promise<boolean> {
        const insertResult = await this.client.db('speedtest')
                .collection('results')
                .insertOne(result)

        return insertResult.result.ok === INSERT_COMPLETED
    }


    async close(): Promise<void> {
        if (!this.client.isConnected()) return;

        await this.client.close()
    }
}