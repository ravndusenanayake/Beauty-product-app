import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export async function getProducts(req,res){

    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)
        }else{
            const products = await Product.find({isAvailable : true})
            res.json(products)
        }

       
    }catch(err){
        res.json({
            message: "Failed to get products",
            error: err
        })
    }
}

export function saveProduct(req,res){
//product ek save krnn enne aththatama log wuna user kenekda kyl blnn oone

  if(!isAdmin(req)){
    res.status(403).json({
        message: "you are not authorized to add product"
    })
    return
  }

    const  product = new Product(
        req.body
    );

    product
        .save()
        .then(() =>{
            res.json({
                messege: "Product added success",
            });
        })
        .catch(()=>{
            res.json({
                messege:"Faild to add product",
            })
        }
    );
}

export async function deleteProduct(req,res){
        if(!isAdmin(req)){
            res.status(403).json({
                message: "You are not authorized to delete a product"
            })
            return
        }  
        try{
        await Product.deleteOne({productId : req.params.productId})

        res.json({
            message : "Product deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message : "Failed to deleted product",
            error : err
        })
    }
}
    
