const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");
const {
  spouseEducationCalculator,
  spouseCLBCalculator,
  spouseExperienceCalculator
} = require("../../models/spouseDetails");
const CLBConverter = require("../../models/CLBConverter");
const auth = require('../../middleware/auth');

// GET IMPORTS
const { selector }  = require("../../models/queries");


/************************************* */
// route - /api/spouse-details
// method - post
// type - private
// params - none

router.post("/",auth,async (req, res) => {
  const user_id = req.user.user_id;

  let educationScore = 0;
  let clbString;
  let clbScore = 0;
  let workExperienceScore = 0;
  let totalSpouseScore = 0;

  //TODO implement validation

  let {
    education,
    work_experience,
    listening,
    reading,
    writing,
    speaking
  } = req.body;

  try {
    // calculate education score
    educationScore = spouseEducationCalculator(education);

    // calculate IELTS score
    clbString = CLBConverter(listening, reading, writing, speaking);

    clbScore = spouseCLBCalculator(clbString)*4;

    // caculate spouse experiecen score
    workExperienceScore = spouseExperienceCalculator(work_experience);

    // add total score
    totalSpouseScore = educationScore+clbScore+workExperienceScore;

    //add into database
    insertQuery('spouse',null,[user_id,education,work_experience,listening,reading,writing,speaking,clbString,totalSpouseScore])
    .then(result=>{
      console.log(`spouse-detail inserted for user_id - ${user_id}`);
      return res
            .status(200)
            .json({ status: 0, message: "success" });
    })
    .catch(error=>{
      console.log(`spouse-detail route insert error - ${error}`);
      return res
        .status(500)
        .json({ status: 1, message: "Internal server error!" });
    })
  } catch (error) {
    console.log(`spouse-details router catch post ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
  }
});


// route - /api/spouse-details
// method - put
// type - private
// params - none

router.put('/',auth,(req,res)=>{
  const user_id = req.user.user_id;

  let educationScore = 0;
  let clbString;
  let clbScore = 0;
  let workExperienceScore = 0;
  let totalSpouseScore = 0;

  let {
    education,
    work_experience,
    listening,
    reading,
    writing,
    speaking
  } = req.body;

  try{
 // calculate education score
 educationScore = spouseEducationCalculator(education);

 // calculate IELTS score
 clbString = CLBConverter(listening, reading, writing, speaking);

 clbScore = spouseCLBCalculator(clbString)*4;

 // caculate spouse experiecen score
 workExperienceScore = spouseExperienceCalculator(work_experience);

 // add total score
 totalSpouseScore = educationScore+clbScore+workExperienceScore;

//  update into the database
updateQuery('spouse',null,[education,work_experience,listening,reading,writing,speaking,clbString,totalSpouseScore,user_id])
.then(result=>{
  console.log(`spouse-detail updated for user_id - ${user_id}`);
      return res
            .status(200)
            .json({ status: 1, message: "success" });
})
.catch(error=>{
  console.log(`spouse-details router catch error ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
})
  }catch(error){
    console.log(`spouse-details router catch put ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
  }

});

// route - /api/spouse
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('spouse',['education','work_experience','listening','reading','writing','speaking'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }
      
      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`spouse route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("spouse route route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

const insertQuery = (tableName, columnNames, values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${tableName} VALUES (?,?,?,?,?,?,?,?,?)`,
      values,
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error.message);
        } else {
          resolve(results.affectedRows);
        }
      }
    );
  });
};

const updateQuery = (tableName, columnNames, values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${tableName} SET education=?,work_experience=?,listening=?,reading=?,writing=?,speaking=?,clb=?,score=? WHERE user_id=?`,
      values,
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error.message);
        } else {
          resolve(results.affectedRows);
        }
      }
    );
  });
};


module.exports = router;
