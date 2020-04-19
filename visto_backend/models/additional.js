const joi = require("joi");
const {ageWS,ageWhS} = require('../config/scores');

const validateAdditional = data=>{
  const schema = {
    age:joi.string().required(),
    certification_of_qualification:joi.string().required(),
    noc_level:joi.string().required(),
    immediate_relative:joi.string().required(),
    provincial_nomination:joi.string().required()
  }
  return joi.validate(data, schema);
}

const ageCalculator = (data,spouse)=>{
  if(spouse===1){
    console.log(data);
    // that means spouse is not coming
    return ageWhS[data];
  }else{
    // that means spouse is  coming
    return ageWS[data];
  }
}

const NOCCalculator = (data)=>{
  if(data==='NOC SKill Type 00'){
    return 200;
  }else if(data==='NOC Skill Type A or B or Any Type 0 other than 00'){
    return 50;
  }else{
    return 0;
  }
}

const immediateRelativeCalculator = (data)=>{
  if(data==='immediate_relative_yes'){
    return 15;
  }else{
    return 0;
  }
}

const provincialNominationCalculator = (data)=>{
  if(data==='provincial_nomination_yes'){
    return 600;
  }else{
    return 0;
  }
}



module.exports.validateAdditional=validateAdditional;
module.exports.ageCalculator=ageCalculator;
module.exports.NOCCalculator=NOCCalculator;
module.exports.immediateRelativeCalculator=immediateRelativeCalculator;
module.exports.provincialNominationCalculator=provincialNominationCalculator;