import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from 'path';

const app=express();
const PORT=process.env.PORT || 3000;
const __dirname=path.resolve();
// middleware for req.params req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products",productRoutes);

// it is used for the deployment purpose
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
    })
};
app.listen(PORT,()=>{
    connectDB();
    console.log("Server is listening at port 5000");
});
