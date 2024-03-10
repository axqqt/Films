const express = require("express");
const router = express.Router();
const Axios = require("axios");

//idk why i included this here tbh
router.route("/").post(async (req,res)=>{
    const  credentials =req?.body?.credentials; 
    if(!credentials) return res.status(400).json({Alert:"No credentials provided!"})

    const transaction= await Axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {"CLIENT_ID":"CLIENT_SECRET"},
    {headers:{
        "Content-Type": "application/x-www-form-urlencoded"
    }},{
        "grant_type":credentials
    })
    if(!transaction){
        return res.status(400).json({Alert:"error while processing transaction!"})
    }else{
        res.status(200).json(transaction)
    }
   
})

module.exports = router;