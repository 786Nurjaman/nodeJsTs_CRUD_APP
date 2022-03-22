import express from "express"
import { createClient } from 'redis'
import config from "../../config"
import UserService from "./user.service"

const userService = new UserService(config.database);

//User Create
export const createUser = async (req: express.Request | any, res: express.Response) => {
    let query = {}
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    }
    userService.create(newUser).then(async (data) => {
        const user = await userService.getAllUsers(query)
        let uData = JSON.stringify(user);
        const client = createClient();
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        await client.del('userData')
        await client.setEx('userData', 300, uData)
        return res.status(200).json({
            message: "UserCreated Successfully",
            success: true,
            data
        })
    }).catch((error: any) => {
        return res.status(500).json({
            message: "Error in creatn User",
            success: false,
            error: error
        })
    })
}


//getAllUser
export const getAllUser = async (req: express.Request | any, res: express.Response) => {
    console.log(`Fetching Data From Mongodb...`)
    const query = {}
    const user = await userService.getAllUsers(query)
    let uData = JSON.stringify(user);
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.setEx('userData', 300, uData)
    let newdata: any = await client.get('userData')
    let dataNew = JSON.parse(newdata)
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USERS",
                success: false
            })
        } else {
            return res.status(200).json({
                message: "Successfully got all users from Mongodb",
                success: true,
                dataNew
            })
        }
    } else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_GET_USERS",
            success: false
        })
    }
}

//getSingleUser
export const getSingleUser = async (req: express.Request | any, res: express.Response) => {
    const query = { _id: req.params.id }
    const user = await userService.getUser(query)
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USER",
                success: false
            })
        } else {
            return res.status(200).json({
                message: "Successfully got user",
                success: true,
                user
            })
        }
    } else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_GET_USER",
            success: false
        })
    }
}

//updateUser
export const updateUser = async (req: express.Request | any, res: express.Response) => {
    const query = { _id: req.params.id }
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    }
    const user = await userService.update(query, newUser)
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USERS",
                success: false
            })
        } else {
            return res.status(200).json({
                message: "Successfully updated user",
                success: true,
                user
            })
        }
    } else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_UPDATE_USER",
            success: false
        })
    }
}

//updateUser
export const deleteUser = async (req: express.Request | any, res: express.Response) => {
    const query = { _id: req.params.id }
    const user = await userService.delete(query)
    if (user) {
        if (user.length <= 0) {
            return res.status(500).json({
                message: "NOT_FOUND_USERS",
                success: false
            })
        } else {
            return res.status(200).json({
                message: "Successfully deleted users",
                success: true,
                user
            })
        }
    } else {
        return res.status(500).json({
            message: "AN_ERROR_OCCURED_WHILE_TRYING_TO_DELETE_USER",
            success: false
        })
    }
}

//redis middleware
export const redis_Data = async (req: express.Request | any, res: express.Response, next: express.NextFunction) => {
    console.log(`Fetching Data From Redis...`)
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    let newdata: any = await client.get('userData')
    if (newdata) {
        let dataNew = JSON.parse(newdata)
        return res.status(200).json({
            success: true,
            meassage: "Successfully got all users from Redis Cache",
            dataNew
        })
    } else {
        next()
    }
}