import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts=async (req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json({success:true,data:products});
    }catch(err){
        console.log("error in fetching products:",err.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const createProducts=async (req,res)=>{
    const product=req.body;  // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,
            message:"Please provide all fields"
        })
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct})
    }catch(error){
        console.error("Error in saving the product:",error.message);
        res.status(500).json({success:false,
            message:"Server Error"
        })
    }
}

export const deleteProducts=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product Id"});
    }
    try{
        const deletedProduct=await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({success:false,message:"Product not found"});
        }
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })

    }catch(err){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const updateProducts=async(req,res)=>{
    const {id}=req.params;
    const product=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid Product Id"});
    }
    try{
        let updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true,runValidators:true});
        if(!updatedProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        res.status(200).json({success:true,data:updatedProduct});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
}