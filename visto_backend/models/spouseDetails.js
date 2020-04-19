const joi = require("joi");
const {spouseEducation,spouseCLBPoints,spouseWorkExperience}=require('../config/scores');

const spouseEducationCalculator = function(obj){
    return spouseEducation[obj];
}

const spouseCLBCalculator = function(clbString){
    return spouseCLBPoints[clbString];
}


const spouseExperienceCalculator = function(obj){
    return spouseWorkExperience[obj];
}

module.exports.spouseEducationCalculator=spouseEducationCalculator;
module.exports.spouseCLBCalculator=spouseCLBCalculator;
module.exports.spouseExperienceCalculator=spouseExperienceCalculator;