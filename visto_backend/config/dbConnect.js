const mysql = require("mysql");
const config = require("config");

const connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database")
});

const createConnection = function() {
  
  connection.connect(error => {
    if (!error) {
      console.log("congratulations you are connected");
      // connection.end();
    } else {
      console.log(error.message);
    }
  });
};

module.exports = createConnection;
module.exports.connection = connection;
