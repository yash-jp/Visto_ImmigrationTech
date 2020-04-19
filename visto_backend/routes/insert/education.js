const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');
const {educationCalculator,validateEducation} = require('../../models/education');
const auth = require('../../middleware/auth');

const { selector }  = require("../../models/queries");

// UPDATE IMPORTS
const {updateEducation} = require('../../models/update/Education');
/************************************* */

// route - /api/insert/education
// method - post
// type - private
// params - none

router.post("/",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    const { error } = validateEducation(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }

    // but before that check whether coming with or without spouse
    connection.query('SELECT spouse_coming_canada FROM marital_status WHERE user_id=?',[user_id] ,function (error, results) {
      if (error){
        console.log(`education ROUTE select query error - ${error.message}`);
        return res.status(500)
        .json({ status: 1 , message: "Internal server error!"});
      }

      const spouse_coming_canada = results[0]["spouse_coming_canada"];

      const score = educationCalculator(req.body.level_of_education,spouse_coming_canada);

      // TODO:now as you got the score insert into the the education table and change userid
      connection.query(`INSERT INTO education VALUES (?,?,?)`,[user_id,req.body.level_of_education,score],(error,results)=>{
        if(!error){
          console.log('Section - A\n');
          console.log(`Education Score - ${score} user_id - ${user_id}`);
          return res.status(200)
          .json({ status: 0,message: "success"});
        }else{
          console.log(`education ROUTE insert query error - ${error.message}`);
          return res.status(500)
        .json({ status: 1,message: error.message});
        }
      });
    });
  }catch(error){
    console.log(`education ROUTE catch - ${error}`);
    return res.status(500).json({status:1, message:"Internal Server Error"});
  }
});

// route - /api/education/
// method - put
// type - private
// params - none

router.put('/',auth,(req,res)=>{
  try{
    const user_id = req.user.user_id;
    updateEducation(req,res,user_id);
  }catch(error){
    console.log(`education ROUTE catch -  ${error}`);
    return res.status(500).json({status:1,message:"Internal Server Error"});
  }
});

  // route - /api/education
  // method - get
  // type - private
  // params - none

  router.get("/", auth,(req, res) => {
    const user_id = req.user.user_id;
    try {
      selector('education',['level_of_education'],[user_id])
      .then(result=>{
        
        if(!result.length){
          return res.status(200).json({status : 0, message:"success", data:[]}); 
        }
        
        return res.status(200).json({status : 0, message:"success", data:result[0]});
      })
      .catch(error=>{
        console.log(`education route get selector catch - ${error.message}`);
        return res.status(500).json({ status: 1, message: "Internal Server Error" });
      });
    } 
    catch (error) {
      console.log("education route get main catch  - " + error.message);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    }
  });


module.exports = router;