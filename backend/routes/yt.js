const express = require("express");
const router = express.Router();
const {youtube}  = require("scrape-youtube")

router.route("/").post(async (req,res)=>{
    const prompt  =req?.body?.prompt;
    if(!prompt) return res.status(400).json({Alert:"No search!"});

    youtube.search(prompt).then((results) => {
        if(results){
            res.status(200).json(results);
        }else{
            res.status(404).json({Alert:"No results found!"})
        }    
    });
})

module.exports = router;