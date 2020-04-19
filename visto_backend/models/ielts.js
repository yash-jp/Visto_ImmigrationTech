const joi = require("joi");
const {CLBPointsWS,CLBPointsWhS}=require('../config/scores');

const CLBCalculator = function(clbString,type){
  // check type and call accordance score object aka with and without
  if(type===1){
    return CLBPointsWhS[clbString];
  }else{
    return CLBPointsWS[clbString];
  }
}



const validateIELTS = data=>{
  const schema = {
    listening: joi.string().required().min(1).max(3),
    reading: joi.string().required().min(1).max(3),
    writing: joi.string().required().min(1).max(3),
    speaking: joi.string().required().min(1).max(3)
  };
  return joi.validate(data, schema);
}



module.exports.validateIELTS=validateIELTS;
module.exports.CLBCalculator = CLBCalculator;