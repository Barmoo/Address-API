import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import addressRouter from './routes/address.js';
import userRouter from './routes/user.js';



// //connect to database
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database connected")).catch((error) => console.log("Error connecting to database", error))

//create an express app
const app = express();

//use middlewares
app.use(cors());
app.use(express.json());

//use routes
app.use(addressRouter);
app.use(userRouter);
//listen for incoming requests

app.listen(3600, () => {
    console.log('App is listening on port 3600');
});