import {AddressModel} from "../models/address.js";
import { addAddressValidator } from "../validators/address.js";

export const addAddress = async (req,res,next)=>{
    try {
        //validate user inputs
        const {error,value}=addAddressValidator.validate({
            ...req.body,
            icon:req.file?.filename
        });
        if(error){
            return res.status(422).json(error);
        }
        //write address to database
        await AddressModel.create(value);
        //respond to request
        
        res.status(201).json('Address was added');
    } catch (error) {
        next(error);
        
    }
}

export const getAddress = async (req,res,next)=>{
    try {
        const{id}=req.params;
        //get address by id fron database
        const address = await AddressModel.findById(id);
        //respond to response

        res.status(201).json(address);
    
    } catch (error) {
        next(error);
    }
}
export const getAddresses = async (req,res,next)=>{
    try {
        const {filter = "{}",sort="{}",limit = 0, skip = 0} = req.query;
        //fetch  addresses from database
        const addresses = await AddressModel
        .find(JSON.parse(filter))
        .sort(JSON.parse(sort))
        .lomit(limit)
        .skip(skip);
         
        res.status(200).json(addresses);
    } catch (error) {
        next(error);
        
    }
}

export const updateAddress = (req,res,next)=>{
    res.json('Address was added');
}

export const deleteAddress = (req,res,next)=>{
    res.json('Address was deleted');
}