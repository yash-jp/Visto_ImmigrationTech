const { connection } = require('../../config/dbConnect');

const updateEducation = (req,res,user_id)=>{
 connection.query(`UPDATE education SET level_of_education=? WHERE user_id=?`,[req.body.level_of_education,user_id],(error,result)=>{
   if(error){
     consolelog(`update ROUTE error - ${error}`);
    return res.status(500)
    .json({ status: 1,message: error.message});
   }
   console.log(`education updated - ${result.affectedRows}`);
   return res.status(200).json({status:0,message:"success"});
 });
}

module.exports.updateEducation=updateEducation;
