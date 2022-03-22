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
const mongodb_service_1 = __importDefault(require("../../services/mongodb.service"));
const user_model_1 = __importDefault(require("./user.model"));
class UserService extends mongodb_service_1.default {
    constructor(options) {
        super(options);
    }
    init() {
        const _super = Object.create(null, {
            dbReady: { get: () => super.dbReady }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.dbConnection = yield _super.dbReady.call(this);
            if (this.dbConnection) {
                return true;
            }
            return false;
        });
    }
    create(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(user_model_1.default);
                return yield new user_model_1.default(query).save();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne(query).exec();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAllUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.find().exec();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    update(query, updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOneAndUpdate(query, updateUser, { new: true });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findByIdAndDelete(query, { new: true });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = UserService;
