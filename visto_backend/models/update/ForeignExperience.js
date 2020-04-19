const { connection } = require('../../config/dbConnect');
const {foreignExperienceYearsConverter} = require('../../models/foreignExperience');

const updateForeignExperience = (req,res,user_id)=>{
  // convert foreign_experience in int
  const expInYears = foreignExperienceYearsConverter(req.body.foreign_experience);
  

  connection.query(`UPDATE foreign_experience SET foreign_experience=?, years=? WHERE user_id=?`,[req.body.foreign_experience,expInYears,user_id],(error,result)=>{
    if(error){
      console.log(`update foreign_experience ROUTE error`)
    return res.status(500)
    .json({ status: 1,message: error.message});
    }
    console.log(`foreign_experience UPDATE as ${req.body.foreign_experience} for ${user_id}`);
    return res.status(200).json({status:0,message:"success"});
  });
}

module.exports.updateForeignExperience=updateForeignExperience;
