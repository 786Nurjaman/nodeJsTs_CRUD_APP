"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const mongodb_service_1 = __importDefault(require("./services/mongodb.service"));
const routes_1 = __importDefault(require("./routes"));
const redis = require('redis');
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoOptions = new mongodb_service_1.default(config_1.default.database);
    yield mongoOptions.dbReady();
}))();
app.use(express_1.default.json()); //read the data from body
app.use("/api/v1/", routes_1.default);
// export const client = redis.createClient({
//     host: "127.0.0.1",
//     port: 6379
//   });
//   export const redisClient = client.on('connect', function() {
//     console.log('Redis Connected!');
//   });
app.listen(config_1.default.serverPort, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running at port : ${config_1.default.serverPort}`);
}));
