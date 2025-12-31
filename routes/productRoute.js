import express from "express";
import { deleteProduct, getProducts, saveProduct } from "../controllers/productController.js";

const ProductRouter  = express.Router();

ProductRouter.get("/",getProducts);
ProductRouter.post("/",saveProduct);
//postman eke URKL ekema delete krna prdct eke prdctId eka ghla delt krna plwn wenna tmi "/:oriductiD KYLA DENNE NATHTHN "/productId " mehma dunnoth postman ekeURL eketh Id EK NODE 'productId' kyla name ekai denne...  
ProductRouter.delete("/:productId", deleteProduct)

export default ProductRouter;