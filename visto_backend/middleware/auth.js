const config = require("config");
const jwt = require("jsonwebtoken");

function auth (req,res,next){
  try{
    const token = req.header("x-auth-token");

    if(!token){
      return res.status(401).json({
        status: 1,
        message: "Access denied"
      });
    }

    const decoded = jwt.verify(
      token,
      config.get("jwtPrivateKey"),
      (err, decoded) => {
        if (!err) {
          req.user = decoded;
          next();
        } else {
          console.log(`auth middle ware error invalid token`);
          return res
            .status(401)
            .json({ status: 1, message: "Invalid token Access Denied" });
        }
      }
    );

  }catch(error){
    console.log(`auth middleware CATCH error - ${error}`);
    return res
      .status(500)
      .json({ status: 1, message: "Internal Server Error" });
  }
}

module.exports = auth;