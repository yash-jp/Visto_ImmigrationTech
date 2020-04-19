const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');
const {validateForeignExperience,foreignExperienceYearsConverter,calculateWithCanadianExperience,calculateWithCLB} = require('../../models/foreignExperience');
const auth = require('../../middleware/auth');

const { selector }  = require("../../models/queries");

// UPDATE IMPORT
const {updateForeignExperience} = require('../../models/update/ForeignExperience');

/************************************* */

// route - /api/foreign-experience
// method - post
// type - private
// params - none

router.post("/",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  let canadianExperience,foreignExperience,clb;
  let foreignExperienceWithCLBScore,foreignExperienceWithCanadianExperienceScore,score=0;
  try{
    const { error } = validateForeignExperience(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }
    
    // convert foreign experience into years
    const foreignExperience = foreignExperienceYearsConverter(req.body.foreign_experience);
    console.log(`FOREIGN EXPERIENCE IN YEARS - ${foreignExperience}`);

    // get canadian-experience
    selectQuery("canadian_experience","years",[user_id])
    .then((result)=>{
      // console.log(`CANADIAN EXPERIENCE - ${result[0].years}`);
      canadianExperience = result[0].years;
 
      //now get the CLB score from ielts table
      selectQuery("ielts","clb",[user_id])
      .then((result)=>{
        console.log(`CLB SCORE - ${result[0].clb}`);
        clb = result[0].clb;

        // now we are set to implement out main logic

        // with canadian experience
        foreignExperienceWithCanadianExperienceScore=calculateWithCanadianExperience(foreignExperience,canadianExperience);
        console.log(`withCanadianExp - ${foreignExperienceWithCanadianExperienceScore}`);

        // with clb
        foreignExperienceWithCLBScore=calculateWithCLB(foreignExperience,clb);
        console.log(`withCLB - ${foreignExperienceWithCLBScore}`);

        // check if addition one of them === 50
        if(foreignExperienceWithCanadianExperienceScore===50 || foreignExperienceWithCLBScore ===50){
          score=50;
        }else{
          score = foreignExperienceWithCLBScore+foreignExperienceWithCanadianExperienceScore;
        }

        // use score to insert
        insertForeignExperience(res,[user_id,req.body.foreign_experience,foreignExperience,score]);
      })
      .catch((error)=>{
        return res.status(500)
        .json({ status: 1,message: error});
      })
    })
    .catch((error)=>{
      return res.status(500)
        .json({ status: 1,message: error});
    })

  }catch(error){
    console.log(`canadian-education ROUTER ${error}`);
    return res.status(500)
    .json({ status: 1,message: error});
  }
});

function insertForeignExperience(res,values){
  connection.query(`INSERT INTO foreign_experience  VALUES (?,?,?,?)`,values,(err,results)=>{
    if(!err){
      console.log('data inserted affected rows: ', results.affectedRows);
      return res.status(200)
      .json({ status: 0,message: "success"});
    }else{
      return res.status(500)
        .json({ status: 1,message: err.message});
    }
  });
}

const selectQuery = (table,column,values)=>{
  return new Promise((resolve,reject)=>{
    connection.query(`SELECT ${column} FROM ${table} WHERE user_id=?`,values,(error,result)=>{
      if(error){
        reject(error.message);
      }
      resolve(result);
    });
  }); 
};

// route - /api/foreign-experience/
// method - put
// type - private
// params - none

router.put('/',auth,(req,res)=>{
  try{
    // TODO get user_id from token
    const user_id = req.user.user_id;
    updateForeignExperience(req,res,user_id);
  }catch(error){
    console.log(`foreign-expereince ROUTE UPDATE catch -  ${error}`);
    return res.status(500).json({status:1,message:"Internal Server Error"});
  }
});

// route - /api/foreign
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('foreign_experience',['foreign_experience'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }
      
      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`foreign-experience education route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("foreign-experience route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

module.exports = router;