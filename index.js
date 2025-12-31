import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import ProductRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());


//bearer histhanak tibila tmi token ek tyne eeka clear naane eeka nisaa bearer kyn kotasa ain kr gnda oone
app.use((req, res, next) => {
  const tokenString = req.header("Authorization")
  if(tokenString != null){      //bearer ekt psse space ekk tynn
    const token = tokenString.replace("Bearer ","")
   // console.log(token)  
    
    jwt.verify(token, "cbc-batch-five#@2025",
      (err,decoded)=>{
        if(decoded != null){
          req.user = decoded
          next()
        }else{
          console.log("Invalid Token")
          res.status(403).json({
            message : "Invalid token"
          })
        }
      }
    )
                              
  }else{
    next()
  }
  // next();
})
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://admin:123@cluster0.comxkvx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Database connection failed");
  });


app.use("/products", ProductRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// project ek kaatahari ywddi node module folder ek ywnd oon na size ek lokui ne eeka dlt krl ywnne eeka gnda plwn
// npm install kyl ghl