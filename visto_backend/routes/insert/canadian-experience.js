const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');
const {spouseComingCanada} = require('../../models/queries');
const {canadianExperienceCalculator,validateCanadianExperience,canadianExperienceYearsConverter}=require('../../models/canadianExperience');
const auth = require('../../middleware/auth');

const { selector }  = require("../../models/queries");

/************************************* */
// UPDATE ROUTES
const {updateCanadianExperience} = require('../../models/update/CanadianExperience');

// route - /api/canadiand-experience
// method - post
// type - private
// params - none

router.post("/",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    const { error } = validateCanadianExperience(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }
    
    // convert canadian experience in int
    const expInYears = canadianExperienceYearsConverter(req.body.years);
    let score=null; //will asign inside the then of spouseComingCanada
    // check whether spouse coming to canada or not
    spouseComingCanada("marital_status",["spouse_coming_canada"],[user_id])
    .then((result)=>{
      // calculate the canadian-experience score
      score = canadianExperienceCalculator(req.body.years,result);
      insertCanadianExperience(res,[user_id,req.body.years,expInYears,score]);
    })
    .catch((error)=>{
      console.log(`canadian_experience route select error - ${error}`);
      return res.status(500)
      .json({ status: 1,message: error});
    })
  }catch(error){
      console.log(`canadian_experience route catch - ${error}`);
      return res.status(500)
      .json({ status: 1,message: error});
  }
});

// route - /api/canadian-experience
// method - put
// type - private
// params - none

// TODO:implement authentication
router.put('/',auth,(req,res)=>{
  // TODO get user_id from token
  const user_id = req.user.user_id;
  try{
    updateCanadianExperience(req,res,user_id);
  }catch(error){
    console.log('canadian-experience Route Error');
    return res.status(500).json({status:1,message:error.message});
  }
});

// route - /api/canadian-experience
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('canadian_experience',['canadian_experience'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }
      
      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`canadian-experience route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("canadian-experience route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

function insertCanadianExperience(res,values){
  connection.query(`INSERT INTO canadian_experience VALUES (?,?,?,?)`,values,(error,results)=>{
    if(!error){
      console.log(`canadian experience points - ${values[3]} added for user_id - ${values[0]}`);
      return res.status(200)
      .json({ status: 0,message: "success"});
    }else{
      console.log(`canadian-experience route error - ${error.message}`)
      return res.status(500)
        .json({ status: 1,message: error.message});
    }
  });
}

module.exports = router;