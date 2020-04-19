const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const { selector }  = require("../../models/queries");

// route - /api/admin/getAllUsers
// method - get
// type - private
// params - none
// TODO need to make only admin can access it - findway think!

router.get("/getAllUsers", auth,(req, res) => {
  let users;

  // here we will store copy of users and make changes in that and eventually return that to user
  let newUser;
  
  try {
    selector('users',['user_id','first_name','email','country'],null)
    .then(result=>{
      if(!result.length){
        return res.status(200).json({status:0,message:'success',data:[]});
      }
      
      // store data in users array
      users=result;

      // store it in different array
      newUser = users;

      return selector('score',['user_id','section_a','section_b','section_c','section_d','crs_score'],null);
    })
    .then(result=>{
      if(!result.length){
        return res.status(200).json({status:0,message:'success',data:users});
      }

      // loop into users
      users.forEach((user,i,a) => {
        // loop into result array
        result.forEach((score)=>{
          if(score.user_id===user.user_id){
            newUser[i].score=score;
            console.log(a[i]);
          }
        });
      });
      return res.status(200).json({status:0,message:'success',data:newUser});
    })
    .catch(error=>{
      console.log(`admin route get all users error - ${error.message}`);
      return res.status(500).json({status:1,message:"Internal Server Error"});
    })

  } 
  catch (error) {
    console.log("additional route get main catch  - " + error.message);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

// route - /api/admin/getUser
// method - get
// type - private
// params - none

// TODO need to make only admin can access it - findway think!
// router.get("/getUser", auth,(req, res) => {
  
//   try {
//     selector('users',['first_name','email','country'],null)
//     .then(result=>{
   
//       // return res.status(200).json({status:0,message:'success',data:result[0]});
      
//     })
//     .then(result=>{
//       console.log(result);
//     })
//     .catch(error=>{
//       console.log(`admin route get all users error - ${error.message}`);
//       return res.status(500).json({status:1,message:"Internal Server Error"});
//     })

//   } 
//   catch (error) {
//     console.log("additional route get main catch  - " + error.message);
//     return res.status(500).json({ status: 1, message: "Internal Server Error" });
//   }
// });




module.exports = router;