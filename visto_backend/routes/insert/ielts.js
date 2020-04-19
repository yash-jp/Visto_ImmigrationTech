const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");
const { validateIELTS } = require("../../models/ielts");
const CLBConverter = require("../../models/CLBConverter");
const { CLBCalculator } = require("../../models/ielts");
const auth = require('../../middleware/auth');

const { selector }  = require("../../models/queries");

// UPDATE IMPORTS
const { updateIELTS } = require("../../models/update/IELTS");
/************************************* */
// route - /api/ielts
// method - post
// type - private
// params - none

// TODO:implement authentication
router.post("/",auth,async (req, res) => {
  // TODO get user_id from token
  const user_id = req.user.user_id;
  try {
    const { error } = validateIELTS(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }

    // convert into CLB
    const clbString = CLBConverter(
      req.body.listening,
      req.body.reading,
      req.body.writing,
      req.body.speaking
    );

    // check whether coming with or without spouse
    connection.query(
      "SELECT spouse_coming_canada FROM marital_status WHERE user_id=?",
      [user_id],
      function(error, results) {
        if (error) {
          console.log(`ielts route SELECT query error - ${error.message}`);
          return res
            .status(500)
            .json({ status: 1, message: "Internal server error!" });
        }
        // console.log(`selected data - ${JSON.stringify(results[0])}`);
        const spouse_coming_canada = results[0]["spouse_coming_canada"];

        // here we are passing clb string we do not need object, req.body
        let score = CLBCalculator(clbString, spouse_coming_canada);

        // multiplying score to 4
        score *= 4;
        // console.log(`CLB INTEGER SCORE - ${score}`);

        // now we need to insert into IELTS table against that user id
        insertQuery("ielts", null, [
          user_id,
          req.body.listening,
          req.body.reading,
          req.body.writing,
          req.body.speaking,
          clbString,
          score
        ])
          .then(results => {
            console.log(`ielts-score - ${score} added for user_id - ${user_id}`);
            return res.status(200).json({ status: 0, message: "success" });
          })
          .catch(err => {
            return res.status(500).json({ status: 1, message: err });
          });
      }
    );
  } catch (error) {
    console.log(`ielts router catch post ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
  }
});

const insertQuery = (tableName, columnNames, values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${tableName} VALUES(?,?,?,?,?,?,?)`,
      values,
      (err, results) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(results.affectedRows);
        }
      }
    );
  });
};

// route - /api/ielts
// method - put
// type - prrivate
// params - none

router.put("/",auth, async (req, res) => {
  const user_id = req.user.user_id;
  try {
    updateIELTS(req, res, user_id);
  } catch (error) {
    console.log(`ielts router catch put ${error}`);
    return res.status(500).json({ status: 1, message: error.message });
  }
});

// route - /api/ielts
// method - get
// type - private
// params - none

router.get("/", auth,(req, res) => {
  const user_id = req.user.user_id;
  try {
    selector('ielts',['listening','reading','writing','speaking'],[user_id])
    .then(result=>{
      
      if(!result.length){
        return res.status(200).json({status : 0, message:"success", data:[]}); 
      }
      
      return res.status(200).json({status : 0, message:"success", data:result[0]});
    })
    .catch(error=>{
      console.log(`ielts route get selector catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: "Internal Server Error" });
    });
  } 
  catch (error) {
    console.log("ielts route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

module.exports = router;
