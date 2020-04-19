const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');
const bcrypt = require("bcrypt");

// dependencies
const {validateUser} = require('../../models/auth/SignUp');

/************************************* */

// route - /api/auth/sign-up
// method - post
// type - public
// params - none

router.post('/',async (req,res)=>{
  const { error } = validateUser(req.body);
  
  if(error){
    return res
    .status(400)
    .json({status:1,message:error.details[0].message});
  }

  // FIXME right now unique email is checking at database level
  // unique email will be checked at the database level, if same email is there then it will through an error
  let {first_name,last_name,email,password,country,user_type} = req.body;
  
  // bcrypt logic
  // generate salt
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password,salt);

  let tableName='';

  if(user_type==='admin'){
    tableName='admins';
  }else{
    tableName='users';
  }

  insertor(tableName,[first_name,last_name,email,password,country])
  .then(result=>{
    return res.status(200).json({status:0,message:"success"});

    // TODO decide should I send location here where to redirect after successful login
  })
  .catch(error=>{
    console.log(`signup route catch - ${error.message}`);
    if(error.errno===1062){
      return res.status(500).json({status:0,message:"Email Already Exist"});
    }
    return res.status(500).json({status:1,message:"Internal Server Error"});
  })
});

const insertor = (table,values)=>{
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} (first_name,last_name,email,password,country) VALUES (?,?,?,?,?)`,
      values,
      (error, result) => {
        if (error) {
          
          reject(error);
        }
        resolve(result);
      }
    );
  });
}

module.exports = router;