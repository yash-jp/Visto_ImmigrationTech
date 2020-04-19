const { connection } = require("../../config/dbConnect");

const updateCanadianEducation = (req, res, user_id) => {
  // TODO replace 3 with user_id
  connection.query(
    `UPDATE canadian_education SET level_of_education=? WHERE user_id=?`,
    [req.body.level_of_education, user_id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ status: 1, message: error.message });
      }
      console.log(
        `canadian-education - ${req.body.level_of_education} updated for user_id - ${user_id}`
      );
      return res.status(200).json({ status: 0, message: "success" });
    }
  );
};

module.exports.updateCanadianEducation = updateCanadianEducation;
