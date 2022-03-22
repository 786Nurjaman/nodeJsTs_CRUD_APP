import express from "express";
import config from "./config";
import MongoService from "./services/mongodb.service";
import routes from "./routes";

const redis = require('redis');
const app: express.Express = express();

(async () => {
    const mongoOptions = new MongoService(config.database);
    await mongoOptions.dbReady();
})();

 app.use(express.json()); //read the data from body

app.use("/api/v1/", routes);
// export const client = redis.createClient({
//     host: "127.0.0.1",
//     port: 6379
//   });
  
//   export const redisClient = client.on('connect', function() {
//     console.log('Redis Connected!');
//   });
app.listen(config.serverPort, async () => {
    console.log(`Server running at port : ${config.serverPort}`);
});
