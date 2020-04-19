const { connection } = require('../../config/dbConnect');
const {canadianExperienceYearsConverter} = require('../canadianExperience');

const updateCanadianExperience = (req,res,user_id)=>{
  // convert canadian_experience in int
  const expInYears = canadianExperienceYearsConverter(req.body.years);
  

  connection.query(`UPDATE canadian_experience SET canadian_experience=?, years=? WHERE user_id=?`,[req.body.years,expInYears,user_id],(error,result)=>{
    if(error){
      console.log(`update canadian_experience ROUTE error`)
    return res.status(500)
    .json({ status: 1,message: error.message});
    }
    console.log(`canadian-experience UPDATE as ${req.body.years} for ${user_id}`);
    return res.status(200).json({status:0,message:"success"});
  });
}

module.exports.updateCanadianExperience=updateCanadianExperience;
