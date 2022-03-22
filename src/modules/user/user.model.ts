import mongoose, {Schema} from "mongoose"

const UserSchema: Schema = new Schema({
    first_name: String,
    last_name: String,
    mobile: String,
    email: String
})
export default mongoose.model("user", UserSchema)