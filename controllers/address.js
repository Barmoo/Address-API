import {AddressModel} from "../models/address.js";
import { addAddressValidator, updateAddressValidator } from "../validators/address.js";

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
        .limit(limit)
        .skip(skip);
         
        res.status(200).json(addresses);
    } catch (error) {
        next(error);
        
    }
}

export const updateAddress = async (req,res,next)=>{
    try {//validate the input
        const{error,value} = updateAddressValidator.validate(req.body);
        if(error){
            return res.status(422).json(error);
        }
        // write updeted address to the database
        const updatedAddress = await AddressModel.findOneAndUpdate({
            _id: req.params.id,
            user: req.auth.id
        },
        value,{new: true}
    );
    if(!updatedAddress){
        return res.status(404).json({
            message: 'Address not found'
        });
    }
    //respond to request
        res.status(201).json('Address was added');
    } catch (error) {
        next(error);  
    }
}

export const deleteAddress =async (req,res,next)=>{
    try {
        const deletedAddress = await AddressModel.findOneAndDelete({
            id: req.params.id,
            user: req.auth.id
        },
    );
    if(!deletedAddress){
        return res.status(404).json({
            message: 'Address not found'
        });
    }
        res.status(200).json('Address was deleted');
    } catch (error) {
        next(error);
        
    }
};