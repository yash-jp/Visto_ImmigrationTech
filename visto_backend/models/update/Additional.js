const { connection } = require("../../config/dbConnect");

const updateAdditional = (req, res, user_id) => {
  // TODO replace 3 with user_id
  connection.query(
    `UPDATE additional SET age=?, 
                                          certification_of_qualification=?,
                                          noc_level=?,
                                          provincial_nomination=?,
                                          immediate_relative=?
                                          WHERE user_id=?`,
    [
      req.body.age,
      req.body.certification_of_qualification,
      req.body.noc_level,
      req.body.provincial_nomination,
      req.body.immediate_relative,
      user_id
    ],
    (error, result) => {
      if (error) {
        return res.status(500).json({ status: 1, message: error.message });
      }
      console.log(
        `Updated additional for user_id-${user_id} - ${result.affectedRows}`
      );
      return res.status(200).json({ status: 0, message: "success" });
    }
  );
};

module.exports.updateAdditional = updateAdditional;
