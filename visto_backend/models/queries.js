const { connection } = require('../config/dbConnect');

// this query will be used to check whether spouse is coming to canada or not
const spouseComingCanada = (tableName,columnNames,values)=>{
  return new Promise((resolve,reject)=>{
    connection.query(`SELECT ${columnNames[0]} FROM ${tableName} WHERE USER_id=?`,values,(err,results)=>{
      if(err){
        reject(err.message);
      }else{
        resolve(results[0]["spouse_coming_canada"]);
      }
    });
  })
}

const updateScore = (tableName,columnNames,values)=>{
  return new Promise((resolve,reject)=>{
    connection.query(`UPDATE ${tableName} SET ${columnNames[0]}=? WHERE user_id=?`,values,(err,results)=>{
      if(err){
        reject(err.message);
      }else{
        console.log(result);
        resolve(results);
      }
    });
  })
}

const selector = (table, column, values) => {
  return new Promise((resolve, reject) => {
    let query;

    // because inside the admin dashboard when first we need to get all the records at that time values will be null so we ned to twitch query accordingly
    if(values===null){
      query = `SELECT ${[...column]} FROM ${table}`;
    }else{
      query = `SELECT ${[...column]} FROM ${table} WHERE user_id=?`;
    }

    connection.query(
      query,
      values,
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};



module.exports.spouseComingCanada = spouseComingCanada;
module.exports.updateScore = updateScore;
exports.selector = selector;