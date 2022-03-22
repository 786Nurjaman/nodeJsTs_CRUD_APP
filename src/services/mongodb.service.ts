import mongoose from 'mongoose';
import constructMongodbOptions from "../utils/constructMongodbOptions";
import { DatabaseConfig } from "../types";
import config from "../config";

interface DbOptions {
    username?: string;
    password?: string;
    host?: string;
    dbName?: string;
}

class MongoStoreService {
    url: string;
    dbOptions: DbOptions;
    db: any;
    appStart: boolean;

    constructor(options: DatabaseConfig) {
        const { uri, options: dbOptions } = constructMongodbOptions(options);
        this.url = uri;
         this.dbOptions = dbOptions;
        this.db = null;
        this.appStart = true;
    }

    async dbReady() {
        if (this.db) {
            return this.db;
        }

        const dbConnection = await mongoose.connect(this.url, {
            ...this.dbOptions,
            dbName: config.database.dbName
        });
        try {
            if (dbConnection) {
                console.log("Successfully connected to mongodb");
                this.db = dbConnection;
                return this.db;
            }
        } catch (err) {
           console.log("Cannot connect to mongodb", err);
        }

    }
}

export default MongoStoreService;
