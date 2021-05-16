import {Repository} from "../repository";
import {MongoClient} from "mongodb";
import {createClient, INSERT_COMPLETED} from "../../../db/mongodb";


class SpeedTestResultRepository implements Repository<any> {
    private readonly client: MongoClient;


    constructor() {
        this.client = createClient();
    }


    async connect(): Promise<this> {
        await this.client.connect()

        return this;
    }


    async store(result: any): Promise<boolean> {
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


export {SpeedTestResultRepository}