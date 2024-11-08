import { Schema,model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const addressSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user"},
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}
},{
    timestamps: true
});

addressSchema.index({name: "text", title: "text"});

addressSchema.plugin(toJSON);

export  const AddressModel = model('Address',addressSchema);