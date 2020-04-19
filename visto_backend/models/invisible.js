const educationTransferablePointsCLB = (level,clb)=>{
  if(clb>=9){
    switch(level){
      case "none" : {
        return 0;
        break;
       }
       case "secondary" : {
        return 0;
        break;
       }
       case "one-year" : {
        return 25;
        break;
       }
       default :{
         return 50;
         break;
       }
    }
  }
  else if(clb>=7){
    switch(level){
      case "none" : {
        return 0;
        break;
       }
       case "secondary" : {
        return 0;
        break;
       }
       case "one-year" : {
        return 13;
        break;
       }
       default :{
         return 25;
         break;
       }
    }
  }else{
    return 0;
  }
}

const experienceTransferablePointsCLB = (level,experience)=>{
  if(experience>=2){
    switch(level){
      case "none" : {
        return 0;
        break;
       }
       case "secondary" : {
        return 0;
        break;
       }
       case "one-year" : {
        return 25;
        break;
       }
       default :{
         return 50;
         break;
       }
    }
  }
  else if(experience>=1){
    switch(level){
      case "none" : {
        return 0;
        break;
       }
       case "secondary" : {
        return 0;
        break;
       }
       case "one-year" : {
        return 13;
        break;
       }
       default :{
         return 25;
         break;
       }
    }
  }else{
    return 0;
  }
}

module.exports.educationTransferablePointsCLB=educationTransferablePointsCLB;
module.exports.experienceTransferablePointsCLB=experienceTransferablePointsCLB;
