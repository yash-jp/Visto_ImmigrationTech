const joi = require("joi");

const validateMaritalStatus = data=>{
  const schema = {
    marital_status_type: joi.string().required(),
    spouse_citizen:joi.string(),
    spouse_coming_canada:joi.string()
  };
  return joi.validate(data, schema);
}

module.exports.validateMaritalStatus = validateMaritalStatus;