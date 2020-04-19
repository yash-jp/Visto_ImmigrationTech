const joi = require("joi");

const validateLogin = data=>{
  const schema = {
    email:joi.string().email().required(),
    password:joi.string().required(),
    user_type:joi.string().required()
  }
  return joi.validate(data, schema);
}

exports.validateLogin=validateLogin;