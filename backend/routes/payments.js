const express = require("express");
const router = express.Router();
const Axios = require("axios");


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
    res.status(200).json(transaction)
})

module.exports = router;