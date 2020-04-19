const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');

const auth = require('../../middleware/auth');

const { selector }  = require("../../models/queries");

/************************************* */

// route - /api/isFirstTime
// method - get
// type - private
// params - none

router.get("/isFirstTime",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    selector('score',['crs_score'],[user_id])
    .then(result=>{
      if(!result.length){
        console.log(`isFirstTiem route`);
          return res
            .status(200)
            .json({
              status: 1,
              isFirstTime:true,
              message: "score not calculated"
            });

      }else{
        return res
            .status(200)
            .json({
              status: 0,
              isFirstTime:false,
              message: "score calculated"
            });
      }
    })
    .catch(error=>{
      console.log(`isFirstTime error - ${error.message}`);
      return res.status(500)
      .json({ status: 1,message: "Internal Server Error"});
    })
  }catch(error){
    console.log(`isFirstTime main catch - ${error}`);
      return res.status(500)
      .json({ status: 1,message: error});
  }
});

// route - /api/isSpouseComing
// method - get
// type - private
// params - none

router.get("/isSpouseComing",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    selector('marital_status',['spouse_coming_canada'],[user_id])
    .then(result=>{

      if(result[0].spouse_coming_canada===0){
        return res
            .status(200)
            .json({
              status: 0,
              isSpouseComing:true,
              message: "spouse coming"
            });
      }else{
        return res
            .status(200)
            .json({
              status: 0,
              isSpouseComing:false,
              message: "spouse not comings"
            });
      }
        
      
    })
    .catch(error=>{
      console.log(`isFirstTime error - ${error.message}`);
      return res.status(500)
      .json({ status: 1,message: "Internal Server Error"});
    })
  }catch(error){
    console.log(`isFirstTime main catch - ${error}`);
      return res.status(500)
      .json({ status: 1,message: error});
  }
});

module.exports=router;