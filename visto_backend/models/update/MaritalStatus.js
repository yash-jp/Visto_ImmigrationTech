const { connection } = require('../../config/dbConnect');

const updateMaritalStatus = (req,res,user_id)=>{
  // check for undefined or null
  let spouse_citizen,spouse_coming_canada;

  if(req.body.spouse_citizen === undefined || req.body.spouse_citizen === null){
    spouse_citizen=1;
    // that means false
  }else{
    if(req.body.spouse_citizen==='spouse_citizen_yes'){
      spouse_citizen=0;
      // that means true
    }else if(req.body.spouse_citizen==='spouse_citizen_no'){
      spouse_citizen=1;
      // that means false
    }else{
      spouse_citizen=1;
      // that means false
    }
  }

  if(req.body.spouse_coming_canada === undefined || req.body.spouse_coming_canada === null){
    spouse_coming_canada=1;
  }else{
    if(req.body.spouse_coming_canada==='spouse_coming_canada_yes'){
      spouse_coming_canada=0;
    }else if(req.body.spouse_coming_canada==='spouse_coming_canada_no'){
      spouse_coming_canada=1;
    }
    else{
      spouse_coming_canada=1;
    }
  }

  // query
  // TODO change user_id to token from jwt
  connection.query(`UPDATE marital_status SET marital_status_type=?, spouse_citizen=?,spouse_coming_canada=? WHERE user_id=?`,[req.body.marital_status_type,spouse_citizen,spouse_coming_canada,user_id],(error,result)=>{
    if(error){
      console.log(`marital-status ROUTE update query error - ${error.message}`);
      return res.status(500)
      .json({ status: 1 , message: "Internal server error!"});
    }

    console.log(`marital-status - ${req.body.marital_status_type} updated for user_id - ${user_id}`);
    return res.status(200).json({status:0,message:"success"});
  })
}

module.exports.updateMaritalStatus = updateMaritalStatus;