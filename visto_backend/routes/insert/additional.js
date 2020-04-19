const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");
const {
  validateAdditional,
  ageCalculator,
  NOCCalculator,
  immediateRelativeCalculator,
  provincialNominationCalculator
} = require("../../models/additional");
const auth = require('../../middleware/auth');

const { updateAdditional } = require("../../models/update/Additional");

const { selector }  = require("../../models/queries");

/************************************* */

// route - /api/additional
// method - post
// type - private
// params - none

router.post("/", auth,async (req, res) => {
  const user_id = req.user.user_id;
  const { error } = validateAdditional(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: 1, message: error.details[0].message });
  }

  let score = 0,
    ageScore = 0,
    certificationScore = 0,
    nocScore = 0,
    immediateRelativeScore = 0,
    provincialNominationScore = 0;
  let clb = 0;

  let {
    age,
    certification_of_qualification,
    noc_level,
    provincial_nomination,
    immediate_relative
  } = req.body;

  // age
  // TODO get user_id from jwt
  selectQuery("marital_status", "spouse_coming_canada", [user_id])
    .then(result => {
      let maritalStatus = result[0]["spouse_coming_canada"];
      ageScore = ageCalculator(req.body.age, maritalStatus);
      console.log(`age score - ${ageScore}`);

      // now to check certification score we need clb
      selectQuery("ielts", "clb", [user_id])
        .then(result => {
          clb = result[0]["clb"];

          if (certification_of_qualification ==="certification_of_qualification_yes") {
            if (clb >= 7) {
              certificationScore = 50;
            } else if (clb >= 5) {
              certificationScore = 25;
            } else {
              certificationScore = 0;
            }
          } else {
            certificationScore = 0;
          }
          console.log(`CERTIFICATION SCORE - ${certificationScore}`);

          // now let's checl NOC level
          nocScore = NOCCalculator(req.body.noc_level);
          console.log(`NOC SCORE - ${nocScore}`);

          // immediate relative calculator
          immediateRelativeScore = immediateRelativeCalculator(
            req.body.immediate_relative
          );
          console.log(`IMMEDIATE RELATIVE SCORE - ${immediateRelativeScore}`);

          // provincial_nomination
          provincialNominationScore = provincialNominationCalculator(
            req.body.provincial_nomination
          );
          console.log(
            `Provoncial Nomination score - ${provincialNominationScore}`
          );

          score =
            ageScore +
            certificationScore +
            nocScore +
            immediateRelativeScore +
            provincialNominationScore;

          console.log(`Additional Score - ${score}`);

          // TODO insert this into Database additional table
          connection.query(
            `INSERT INTO additional VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
              user_id,
              age,
              ageScore,
              certification_of_qualification,
              certificationScore,
              noc_level,
              nocScore,
              provincial_nomination,
              provincialNominationScore,
              immediate_relative,
              immediateRelativeScore
            ],
            (error, result) => {
              if (error) {
                console.log(`additional route insert error - ${error}`)
                return res
                  .status(500)
                  .json({ status: 1, message: error.message });
              }
              console.log(`additional values points - ${score} for user_id ${user_id}`);
              return res.status(200).json({ status: 0, message: "success" });
            }
          );
        })
        .catch(error => {
          console.log(`additional route insert query catch`);
          return res.status(500).json({ status: 1, message: error });
        });
    })
    .catch(error => {
      console.log(`additional route select query catch error - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
});

const selectQuery = (table, column, values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${column} FROM ${table} WHERE user_id=?`,
      values,
      (error, result) => {
        if (error) {
          reject(error.message);
        }
        resolve(result);
      }
    );
  });
};

// route - /api/additional
// method - put
// type - private
// params - none

router.put("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    updateAdditional(req, res, user_id);
  } catch (error) {
    console.log("update route  catch PUT - " + error.message);
    return res.status(500).json({ status: 1, message: error.message });
  }
});


// route - /api/additional
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('additional',['age','certification_of_qualification','noc_level','provincial_nomination','immediate_relative'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }

      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`additional route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("additional route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

module.exports = router;