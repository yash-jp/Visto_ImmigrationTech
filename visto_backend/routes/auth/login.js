const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");
const { validateLogin } = require("../../models/auth/Login");
const config = require("config");

const auth = require('../../middleware/auth');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/******************************************************/

// route - /api/auth/login
// method - post
// type - public
// params - none

router.post("/",async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }

    let { email, password,user_type } = req.body;

    let query='';

    if(user_type==='admin'){
      query='SELECT * FROM admins WHERE email=?';  
    }else{
      query='SELECT * FROM users WHERE email=?';  
    }

    connection.query(
      `${query}`,
      [email],
      async (error, result) => {
        if (error) {
          return res.json(error);
        }

        if (!result.length) {
          console.log(`login route error - No matched user found`);
          return res
            .status(400)
            .json({
              status: 1,
              message: "user email and/or password is incorrect"
            });
        }

        let { user_id, first_name, last_name, email } = result[0];

        // compare password
        const validatePassword = await bcrypt.compare(password, result[0].password);

        if (!validatePassword) {
          console.log(`login route error - Password not matched`);
          return res
            .status(400)
            .json({
              status: 1,
              message: "user email and/or password is incorrect"
            });
        }

        //  generate token
        const token = jwt.sign(
          {
            user_id: user_id,
            first_name: first_name,
            email: email
          },
          config.get("jwtPrivateKey")
        );

        return res
        .status(200)
        .json({
          status: 0,
          message: "Login Successful",
          token: token
        });
      }
    );

   
  } catch (error) {
    console.log(`login ROUTE main catch - ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
  }
});

module.exports = router;
