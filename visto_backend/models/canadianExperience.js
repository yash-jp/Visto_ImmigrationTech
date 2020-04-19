const joi = require("joi");
const {canadianExperienceWS,canadianExperienceWhS} = require('../config/scores');

const canadianExperienceCalculator = function(obj,type){
  if(type===1)  //which means without spouse  
  {
    return canadianExperienceWhS[obj];
  }else{
    return canadianExperienceWS[obj];
  } 
}

const validateCanadianExperience = data=>{
  const schema = {
    years : joi.string().required()
  };
  return joi.validate(data, schema);
}

const canadianExperienceYearsConverter = (experience)=>{
  switch(experience){
    case "None or less than a year":{
      return 0;
      break;
    }
    case "1 year":{
      return 1;
      break;
    }
    case "2 years":{
      return 2;
      break;
    }
    case "3 years":{
      return 3;
      break;
    }
    case "4 years":{
      return 4;
      break;
    }
    case "5 years or more":{
      return 5;
      break;
    }
    // TODO haven't put default
  }
}



module.exports.canadianExperienceCalculator=canadianExperienceCalculator;
module.exports.canadianExperienceYearsConverter=canadianExperienceYearsConverter;
module.exports.validateCanadianExperience=validateCanadianExperience;