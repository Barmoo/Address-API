import { Router } from "express";
import {addAddress,getAddresses,getAddress,updateAddress,deleteAddress} from "../controllers/address.js";

//create a router
const addressRouter = Router();

//define routes
addressRouter.post('/addresses',addAddress);

addressRouter.get('/addresses',getAddresses);

addressRouter.get('/addresses/:id',getAddress);

addressRouter.patch('/addresses/:id',updateAddress);

addressRouter.delete('/addresses/:id', deleteAddress);

//export router
export default addressRouter;