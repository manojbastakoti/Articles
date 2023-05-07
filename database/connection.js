const mongoose =require("mongoose");
require("dotenv").config()
// const uri=process.env.DB_URL;

const dbConnection = async(req,res)=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connection successfull") ;
    }catch(error){
        console.log(error);
    }
};
dbConnection();