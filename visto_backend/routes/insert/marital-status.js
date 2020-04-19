const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');
// const {maritalStatusCalculator,validateMaritalStatus} = require('../models/maritalStatus');
const {validateMaritalStatus} = require('../../models/maritalStatus');
const auth = require('../../middleware/auth');

// UPDATE IMPORTS
const {updateMaritalStatus} = require('../../models/update/MaritalStatus');

// GET IMPORTS
const { selector }  = require("../../models/queries");

/******************************** */

// route - /api/marital-status/
// method - post
// type - prrivate
// params - none

router.post("/",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    const { error } = validateMaritalStatus(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1 , message: error.details[0].message });
    }
    
    let temp={};
    // assign type as this will never be null or undefined
    temp.marital_status_type=req.body.marital_status_type;
    
    // check for the undefined AND null
    if(req.body.spouse_citizen === undefined || req.body.spouse_citizen === null){
      temp.spouse_citizen=1;
      // that means false
    }else{
      if(req.body.spouse_citizen==='spouse_citizen_yes'){
        temp.spouse_citizen=0;
        // that means true
      }else if(req.body.spouse_citizen==='spouse_citizen_no'){
        temp.spouse_citizen=1;
        // that means false
      }else{
        temp.spouse_citizen=1;
      }
    }

    if(req.body.spouse_coming_canada === undefined || req.body.spouse_coming_canada === null){
      temp.spouse_coming_canada=1;
    }else{
      if(req.body.spouse_coming_canada==='spouse_coming_canada_yes'){
        temp.spouse_coming_canada=0;
      }else if(req.body.spouse_coming_canada==='spouse_coming_canada_no'){
        temp.spouse_coming_canada=1;
      }
      else{
        temp.spouse_coming_canada=1;
      }
    }

    // TODO:replace first column with foreign key column and get it's value from jwt
    connection.query('INSERT INTO marital_status VALUES(?,?,?,?)',[user_id,temp.marital_status_type,temp.spouse_citizen,temp.spouse_coming_canada] ,function (error, results) {
      if (error){
        console.log(`marital-status ROUTE insert query error - ${error.message}`);
        return res.status(500)
        .json({ status: 1 , message: "Internal server error!"});
      }
      console.log(`marital-status - ${temp.marital_status_type} added for user_id - ${user_id}`);
      res.status(200)
        .json({ status: 0 , message: "success"});
    });
    
  }catch(error){
    console.log(`marital-status router catch post -  ${error}`);
    return res.status(500).json({status:1,message:"Internal Server Error"});
  }
});

// route - /api/marital-status/
// method - put
// type - prrivate
// params - none

router.put("/",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    updateMaritalStatus(req,res,user_id);
  }catch(error){
    console.log(`marital-status router catch put -  ${error}`);
    return res.status(500).json({status:1,message:error.message});
  }
});

// route - /api/marital-status
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('marital_status',['marital_status_type','spouse_citizen','spouse_coming_canada'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }
      
      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`marital-status route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("marital-status route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

module.exports = router;