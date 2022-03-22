"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constructMongodbOptions = (dbOptions) => {
    const options = {
    //    // autoReconnect: 'autoReconnect' in dbOptions ? dbOptions.autoReconnect : true
    };
    const { username, password, host } = dbOptions;
    const uri = `mongodb://${host}`; //this is for local database connection
    // const uri = `mongodb+srv://${username}:${password}@cluster0.fgvpy.mongodb.net`; //this is for cloud database connection
    return {
        uri,
        options
    };
};
exports.default = constructMongodbOptions;
