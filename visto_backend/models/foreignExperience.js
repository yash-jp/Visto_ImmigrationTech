const joi = require("joi");

const validateForeignExperience = data=>{
  const schema = {
    foreign_experience : joi.string().required()
  };
  return joi.validate(data, schema);
}

const foreignExperienceYearsConverter = (experience)=>{
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
    case "3 years or more":{
      return 3;
      break;
    }
    // TODO haven't put default
  }
}

const calculateWithCanadianExperience = (foreignExp,canExperience)=>{
  if(canExperience===1){
    switch(foreignExp){
      case 0:{
        return 0;
        break;
      }
      case 1:{
        return 13;
        break;
      }
      case 2:{
        return 13;
        break;
      }
      case 3:{
        return 25;
        break;
      }
    }
  }else if(canExperience>=2){
    switch(foreignExp){
      case 0:{
        return 0;
        break;
      }
      case 1:{
        return 25;
        break;
      }
      case 2:{
        return 25;
        break;
      }
      case 3:{
        return 50;
        break;
      }
    }
  }else{
    return 0;
  }
}

const calculateWithCLB = (foreignExp,clb)=>{
  if(clb>=9){
    switch(foreignExp){
      case 0:{
        return 0;
        break;
      }
      case 1:{
        return 25;
        break;
      }
      case 2:{
        return 25;
        break;
      }
      case 3:{
        return 50;
        break;
      }
    }
  }else if(clb>=7){
    switch(foreignExp){
        case 0:{
          return 0;
          break;
        }
        case 1:{
          return 13;
          break;
        }
        case 2:{
          return 13;
          break;
        }
        case 3:{
          return 25;
          break;
        }
      }
    }else{
      return 0;
    }
  }


module.exports.calculateWithCanadianExperience=calculateWithCanadianExperience;
module.exports.calculateWithCLB=calculateWithCLB;
module.exports.validateForeignExperience=validateForeignExperience;
module.exports.foreignExperienceYearsConverter=foreignExperienceYearsConverter;