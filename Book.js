const Items = require('../Models/Book');

exports.getItems = (req,res)=>{
    const bName=req.params.bName;
    Items.find({bName:bName})
    .then(response =>{
        res.status(200).json({
            message : "Items Fetched Successfully",
            Items : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
}