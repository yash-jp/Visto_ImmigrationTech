const joi = require("joi");

const validateUser = data=>{
  const schema = {
    first_name:joi.string().required(),
    last_name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(3).required(),
    country:joi.string().required(),
    user_type:joi.string().required()
  }
  return joi.validate(data, schema);
}

module.exports.validateUser=validateUser;