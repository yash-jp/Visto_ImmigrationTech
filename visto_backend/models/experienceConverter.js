const experienceConverter = (years)=>{
  // TODO have a defaulut entry
  switch(years){
    case "None or less than a year" : {
      return 0;
      break;
     }
     case "1 year" : {
      return 1;
      break;
     }
     case "2 years" : {
      return 2;
      break;
     }
     case "3 years" : {
      return 3;
      break;
     }
     case "4 years" : {
      return 4;
      break;
     }
     case "5 years or more":{
       return 5;
       break;
     }
  }
}

module.exports.experienceConverter=experienceConverter;