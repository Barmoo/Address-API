import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    name: {type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'}
},{
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('user',userSchema);