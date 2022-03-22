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
const mongoose_1 = __importDefault(require("mongoose"));
const constructMongodbOptions_1 = __importDefault(require("../utils/constructMongodbOptions"));
const config_1 = __importDefault(require("../config"));
class MongoStoreService {
    constructor(options) {
        const { uri, options: dbOptions } = (0, constructMongodbOptions_1.default)(options);
        this.url = uri;
        this.dbOptions = dbOptions;
        this.db = null;
        this.appStart = true;
    }
    dbReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                return this.db;
            }
            const dbConnection = yield mongoose_1.default.connect(this.url, Object.assign(Object.assign({}, this.dbOptions), { dbName: config_1.default.database.dbName }));
            try {
                if (dbConnection) {
                    console.log("Successfully connected to mongodb");
                    this.db = dbConnection;
                    return this.db;
                }
            }
            catch (err) {
                console.log("Cannot connect to mongodb", err);
            }
        });
    }
}
exports.default = MongoStoreService;
