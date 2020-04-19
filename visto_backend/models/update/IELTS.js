const { connection } = require('../../config/dbConnect');
const CLBConverter = require("../../models/CLBConverter");
const { CLBCalculator } = require("../../models/ielts");

const updateIELTS = (req,res,user_id)=>{
  let score,clbString;
  // convert IELTS to CLB string
   clbString = CLBConverter(
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
          console.log(`ielts route select query error PUT - ${error.message}`);
          return res
            .status(500)
            .json({ status: 1, message: "Internal server error!" });
        }
        
        const spouse_coming_canada = results[0]["spouse_coming_canada"];
        // here we are passing clb string we do not need object, req.body
        score = CLBCalculator(clbString, spouse_coming_canada);

        // multiply score with 4
        score*=4;
        
        // now we need to insert into IELTS table against that user id
        connection.query('UPDATE ielts SET listening=?, reading=?,writing=?,speaking=?,clb=?,score=? WHERE user_id=?',[req.body.listening,req.body.reading,req.body.writing,req.body.speaking,clbString,score,user_id],(error,result)=>{
          if(error){
            console.log(`ielts route insert query error PUT - ${error.message}`);
            return res
            .status(500)
            .json({ status: 1, message: "Internal server error!" });
          }
          console.log(`ielts score updated - ${score} for user_id - ${user_id}`);
          return res
          .status(500)
          .json({ status: 0, message: "success" });
        })
      }
    );
}

module.exports.updateIELTS=updateIELTS;
