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
exports.redis_Data = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUser = exports.createUser = void 0;
const redis_1 = require("redis");
const config_1 = __importDefault(require("../../config"));
const user_service_1 = __importDefault(require("./user.service"));
const userService = new user_service_1.default(config_1.default.database);
//User Create
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    userService.create(newUser).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userService.getAllUsers(query);
        let uData = JSON.stringify(user);
        const client = (0, redis_1.createClient)();
        client.on('error', (err) => console.log('Redis Client Error', err));
        yield client.connect();
        yield client.del('userData');
        yield client.setEx('userData', 300, uData);
        return res.status(200).json({
            message: "UserCreated Successfully",
            success: true,
            data
        });
    })).catch((error) => {
        return res.status(500).json({
            message: "Error in creatn User",
            success: false,
            error: error
        });
    });
});
exports.createUser = createUser;
//getAllUser
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Fetching Data From Mongodb...`);
    const query = {};
    const user = yield userService.getAllUsers(query);
    let uData = JSON.stringify(user);
    const client = (0, redis_1.createClient)();
    client.on('error', (err) => console.log('Redis Client Error', err));
    yield client.connect();
    yield client.setEx('userData', 300, uData);
    let newdata = yield client.get('userData');
    let dataNew = JSON.parse(newdata);
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USERS",
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "Successfully got all users from Mongodb",
                success: true,
                dataNew
            });
        }
    }
    else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_GET_USERS",
            success: false
        });
    }
});
exports.getAllUser = getAllUser;
//getSingleUser
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: req.params.id };
    const user = yield userService.getUser(query);
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USER",
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "Successfully got user",
                success: true,
                user
            });
        }
    }
    else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_GET_USER",
            success: false
        });
    }
});
exports.getSingleUser = getSingleUser;
//updateUser
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: req.params.id };
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    const user = yield userService.update(query, newUser);
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USERS",
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "Successfully updated user",
                success: true,
                user
            });
        }
    }
    else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_UPDATE_USER",
            success: false
        });
    }
});
exports.updateUser = updateUser;
//updateUser
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: req.params.id };
    const user = yield userService.delete(query);
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USERS",
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "Successfully deleted users",
                success: true,
                user
            });
        }
    }
    else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_DELETE_USER",
            success: false
        });
    }
});
exports.deleteUser = deleteUser;
//redis middleware
const redis_Data = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Fetching Data From Redis...`);
    const client = (0, redis_1.createClient)();
    client.on('error', (err) => console.log('Redis Client Error', err));
    yield client.connect();
    let newdata = yield client.get('userData');
    if (newdata) {
        let dataNew = JSON.parse(newdata);
        return res.status(200).json({
            success: true,
            meassage: "Successfully got all users from Redis Cache",
            dataNew
        });
    }
    else {
        next();
    }
});
exports.redis_Data = redis_Data;
