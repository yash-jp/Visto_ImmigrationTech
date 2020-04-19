const joi = require("joi");
const {educationPointsWS,educationPointsWhS}=require('../config/scores');

const educationCalculator = function(obj,type){
  if(type===1){
    return educationPointsWhS[obj];
  }else{
    return educationPointsWS[obj];
  }
}

const validateEducation = data=>{
  const schema = {
    level_of_education: joi.string().required()
  };
  return joi.validate(data, schema);
}



module.exports.educationCalculator=educationCalculator;
module.exports.validateEducation=validateEducation;