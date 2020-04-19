const joi = require("joi");
const { canadianEducation } = require("../config/scores");

const canadianEducationCalculator = function(obj, type) {
  // here we don't require to check whether spouse is coming or not
  return canadianEducation[obj];
};

const validateCanadianEducation = data => {
  const schema = {
    level_of_education: joi.string().required()
  };
  return joi.validate(data, schema);
};

module.exports.canadianEducationCalculator = canadianEducationCalculator;
module.exports.validateCanadianEducation = validateCanadianEducation;
