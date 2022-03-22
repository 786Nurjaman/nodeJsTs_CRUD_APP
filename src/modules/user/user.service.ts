import MongoStoreService from "../../services/mongodb.service";
import { DatabaseConfig } from "../../types";
import user from "./user.model"

class UserService extends MongoStoreService {
    dbConnection: any
    constructor(options: DatabaseConfig){
        super(options)
    }
    async init(): Promise<boolean> {
        this.dbConnection = await super.dbReady()
        if(this.dbConnection) {
            return true
        }
        return false
    }

    async create(query: any) {
        try{
            console.log(user)
            return await new user(query).save()
        }catch(error: any) {
            throw new Error(error)
        }
    }

    async getUser(query: any) {
        try{
            return await user.findOne(query).exec()
        }catch(error: any) {
            throw new Error(error)
        }
    }

    async getAllUsers(query: any) {
        try{
            return await user.find().exec()
        }catch(error: any) {
            throw new Error(error)
        }
    }

    async update(query: any, updateUser: any) {
        try{
            return await user.findOneAndUpdate(query,updateUser,{ new: true})
        }catch(error: any) {
            throw new Error(error)
        }
    }

    async delete(query: any) {
        try{
            return await user.findByIdAndDelete(query,{new: true})
        }catch(error: any) {
            throw new Error(error)
        }
    }

}

export default UserService