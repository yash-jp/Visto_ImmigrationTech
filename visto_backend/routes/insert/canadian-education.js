const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");
const { validateCanadianEducation } = require("../../models/canadianEducation");
const {
  canadianEducationCalculator
} = require("../../models/canadianEducation");
const auth = require('../../middleware/auth');

// UPDATE ROUTES
const {
  updateCanadianEducation
} = require("../../models/update/CanadianEducation");

const { selector }  = require("../../models/queries");

/************************************* */

// route - /api/canadiand-education
// method - post
// type - private
// params - none

router.post("/",auth, async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const { error } = validateCanadianEducation(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }

    // calculate the canadianeducation points
    // null because we do not require to check whether spouse is comign or not
    const score = canadianEducationCalculator(
      req.body.level_of_education,
      null
    );

    // insert into the canadian_education table
    connection.query(
      `INSERT INTO canadian_education VALUES (?,?,?)`,
      [user_id, req.body.level_of_education, score],
      (error, results) => {
        if (!error) {
          console.log(
            `canadian-education points - ${score} added for user_id - ${user_id}`
          );
          return res.status(200).json({ status: 0, message: "success" });
        } else {
          console.log(
            `canadian-education route insert error post - ${error.message}`
          );
          return res.status(500).json({ status: 1, message: error.message });
        }
      }
    );
  } catch (error) {
    console.log(`canadian-education router catch -  ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
  }
});

// route - /api/canadiand-education
// method - put
// type - private
// params - none


router.put("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    updateCanadianEducation(req, res, user_id);
  } catch (error) {
    console.log(`canadian-education router catch put -  ${error}`);
    return res.status(500).json({ status: 1, message: error.message });
  }
});

// route - /api/canadiand-education
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('canadian_education',['level_of_education'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }
      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`canadian-education route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("canadian-education route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

module.exports = router;
