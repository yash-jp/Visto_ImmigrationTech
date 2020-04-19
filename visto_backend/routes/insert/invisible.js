const express = require('express');
const router = express.Router();
const { connection } = require('../../config/dbConnect');
const {experienceConverter}=require('../../models/experienceConverter');
const { educationTransferablePointsCLB,experienceTransferablePointsCLB } = require('../../models/invisible');
const auth = require('../../middleware/auth');

router.post("/",auth,async (req,res)=>{
  const user_id = req.user.user_id;
  try{
    let clb=0;
    let experience_years=0;
    // TODO right now its hardcoded but ten assign it to 0 and database call will store the value
    let level_of_education='';
    let experience = '';
    let educationTransferablePoints = 0;
    let experienceTransferablePoints = 0;
    let score=0;
    
    connection.query(`SELECT clb FROM ielts WHERE user_id=?`,[user_id],(error,result)=>{
      if(!error){
        clb = parseInt(result[0].clb);
        console.log(clb);
        // TODO call education table and get level_of_education and store it in level_of_education which is hardcoded
        connection.query(`SELECT level_of_education FROM education WHERE user_id`,[user_id],(error,result)=>{
          if(!error){
            // TODO assign variable values
            level_of_education = result[0]["level_of_education"];
            console.log(`Education - ${level_of_education}`);

            // to calculate the points with the combination of education+clb
            educationTransferablePoints=educationTransferablePointsCLB(level_of_education,clb);
            console.log(`EDUCATION WITH CLB POINTS - ${educationTransferablePoints}`);

            // TODO now we are getting canadian_experience in years so remove id and use user_id from jwt
            connection.query(`SELECT years FROM canadian_experience WHERE user_id=?`,[user_id],(error,result)=>{
              if(!error){
                experience = result[0].years;
                console.log(`EXPERIENCE - ${experience}`);

                experience_years = experience;
                // experience_years = experienceConverter(experience);
                console.log(`EXPERIENCE IN YEARS - ${experience_years}`);

                experienceTransferablePoints = experienceTransferablePointsCLB(level_of_education,experience_years);
                console.log(`EXPERIENCE TRANSFERABLE POINTS - ${experienceTransferablePoints}`);

                // so if you reach here that means you have everything you need to store education with clb AND/OR canadian_experience
                console.log(`EDUCATION WITH EXPERIENCE AND/OR CLB : withCLB-${educationTransferablePoints} withExperiece - ${experienceTransferablePoints}`);
               
                //  check if one of them is 50 if yes only store one
                // TODO use score to insert into dbase
                if(educationTransferablePoints===50 || experienceTransferablePoints ===50){
                  score = 50;
                }else{
                  score = educationTransferablePoints+experienceTransferablePoints;
                }

                console.log(`TYPE C EDUCATION TRANSFERABLE POINTS - ${score}`);

                // TODO time to store TYPE - C EDUCATION points in database

                connection.query(`INSERT INTO c_education VALUES (?,?,?,?)`,[user_id,educationTransferablePoints,experienceTransferablePoints,score],(error,result)=>{
                  if(error){
                    return res.status(500).json({status:1,message:error.message});
                  }
                  console.log(`c_education inserted successfully - ${result.affectedRows}`);
                  return res.status(200).json({status:0,message:"success"});
                })
              }else{
                return res.status(500).json({status:1,message:error.message});
              }
            })

            
          }else{
            return res.status(500)
            .json({ status: 1,message: err.message});
          }
        })
      }else{
        return res.status(500)
        .json({ status: 1,message: err.message});
      }
    })
  }catch(error){
    console.log(`invisible route catch ${error}`)
  }
});

module.exports = router;
