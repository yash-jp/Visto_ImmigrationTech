const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");
const auth = require('../../middleware/auth');

/************************************* */

// route - /api/score
// method - post
// type - private
// params - none

router.post("/", auth,async (req, res) => {
  const user_id = req.user.user_id;

  let section_a = {},
    section_b = {},
    section_c = {},
    section_d = {};

  let ageScore = 0;
  let educationScore = 0;
  let languageScore = 0;
  let canadianWorkExperienceScore = 0;

  let spouseScore = 0;
  let spouse_coming_canada = 1;

  let c_educationScore = 0;
  let c_foreignWorkScore = 0;
  let certificationOfQualificationScore = 0;

  let immediateRelativeScore = 0;
  let canadaEducationScore = 0;
  let employmentScore = 0;
  let nominationScore = 0;

  let totalScore = 0;

  try {
    selectQuery("education", ["score"], [user_id])
      .then(result => {
        educationScore = result[0].score;

        selectQuery("ielts", ["score"], [user_id])
          .then(result => {
            languageScore = result[0].score;

            selectQuery("canadian_experience", ["score"], [user_id])
              .then(result => {
                canadianWorkExperienceScore = result[0].score;

                selectQuery("c_education", ["score"], [user_id])
                  .then(result => {
                    c_educationScore = result[0].score;

                    selectQuery("foreign_experience", ["score"], [user_id])
                      .then(result => {
                        c_foreignWorkScore = result[0].score;

                        selectQuery(
                          "additional",
                          [
                            "age_score",
                            "certification_of_qualification_score",
                            "noc_level_score",
                            "provincial_nomination_score",
                            "immediate_relative_score"
                          ],
                          [user_id]
                        )
                          .then(result => {
                            ageScore = result[0].age_score;
                            immediateRelativeScore =
                              result[0].immediate_relative_score;
                            certificationOfQualificationScore =
                              result[0].certification_of_qualification_score;
                            employmentScore = result[0].noc_level_score;
                            nominationScore =
                              result[0].provincial_nomination_score;

                            selectQuery(
                              "canadian_education",
                              ["score"],
                              [user_id]
                            )
                              .then(result => {
                                canadaEducationScore = result[0].score;

                                // now lets check the last
                                // check whether spouse is coming or not
                                selectQuery(
                                  "marital_status",
                                  ["spouse_coming_canada"],
                                  [user_id]
                                )
                                  .then(result => {
                                    spouse_coming_canada =
                                      result[0]["spouse_coming_canada"];

                                    // check if spouse is coming to canada or not
                                    if (spouse_coming_canada === 0) {
                                      selectQuery(
                                        "spouse",
                                        ["score"],
                                        [user_id]
                                      )
                                        .then(result => {
                                          spouseScore = result[0].score;
                                          console.log("first");

                                          console.log("second");
                                          // now here we have everyting
                                          section_a = {
                                            Age: ageScore,
                                            "Level of Education": educationScore,
                                            "Official languages proficiency": languageScore,
                                            "Canadian work experience": canadianWorkExperienceScore,
                                            Subtotal:
                                              ageScore +
                                              educationScore +
                                              languageScore +
                                              canadianWorkExperienceScore
                                          };

                                          section_b = {
                                            "Spouse Factors": spouseScore,
                                            Subtotal: spouseScore
                                          };

                                          section_c = {
                                            Education: c_educationScore,
                                            "Foreign work experience": c_foreignWorkScore,
                                            "Certificate of qualification": certificationOfQualificationScore,
                                            Subtotal:
                                              c_educationScore +
                                              c_foreignWorkScore +
                                              certificationOfQualificationScore
                                          };

                                          section_d = {
                                            "Provincial nomination": nominationScore,
                                            "Job offer": employmentScore,
                                            "Study in Canada": canadaEducationScore,
                                            "Sibling in Canada": immediateRelativeScore,
                                            Subtotal:
                                              nominationScore +
                                              employmentScore +
                                              canadaEducationScore +
                                              immediateRelativeScore
                                          };

                                          totalScore =
                                            section_a.Subtotal +
                                            section_b.Subtotal +
                                            section_c.Subtotal +
                                            section_d.Subtotal;

                                          // Here we can add in database
                                          connection.query(
                                            `INSERT INTO score VALUES (?,?,?,?,?,?)`,
                                            [
                                              user_id,
                                              section_a.Subtotal,
                                              section_b.Subtotal,
                                              section_c.Subtotal,
                                              section_d.Subtotal,
                                              totalScore
                                            ],
                                            (error, result) => {
                                              if (error) {
                                                console.log(`score-calculator route insert score error `)
                                                return res.status(500).json({
                                                  status: 1,
                                                  message: error
                                                });
                                              }
                                              return res.status(200).json({
                                                status: 0,
                                                message: "success",
                                                subtotal: [
                                                  section_a,
                                                  section_b,
                                                  section_c,
                                                  section_d
                                                ],
                                                GrandTotal: totalScore
                                              });
                                            }
                                          );
                                        })
                                        .catch(error => {
                                          console.log(
                                            `calculate-score select spouse score catch - ${error.message}`
                                          );
                                          return res.status(500).json({
                                            status: 1,
                                            message: error.message
                                          });
                                        });
                                    } else {
                                      section_a = {
                                        Age: ageScore,
                                        "Level of Education": educationScore,
                                        "Official languages proficiency": languageScore,
                                        "Canadian work experience": canadianWorkExperienceScore,
                                        Subtotal:
                                          ageScore +
                                          educationScore +
                                          languageScore +
                                          canadianWorkExperienceScore
                                      };

                                      section_b = {
                                        "Spouse Factors": spouseScore,
                                        Subtotal: spouseScore
                                      };

                                      section_c = {
                                        Education: c_educationScore,
                                        "Foreign work experience": c_foreignWorkScore,
                                        "Certificate of qualification": certificationOfQualificationScore,
                                        Subtotal:
                                          c_educationScore +
                                          c_foreignWorkScore +
                                          certificationOfQualificationScore
                                      };

                                      section_d = {
                                        "Provincial nomination": nominationScore,
                                        "Job offer": employmentScore,
                                        "Study in Canada": canadaEducationScore,
                                        "Sibling in Canada": immediateRelativeScore,
                                        Subtotal:
                                          nominationScore +
                                          employmentScore +
                                          canadaEducationScore +
                                          immediateRelativeScore
                                      };

                                      totalScore =
                                      section_a.Subtotal +
                                      section_b.Subtotal +
                                      section_c.Subtotal +
                                      section_d.Subtotal;

                                      // Here we can add in database
                                      connection.query(
                                        `INSERT INTO score VALUES (?,?,?,?,?,?)`,
                                        [
                                          user_id,
                                          section_a.Subtotal,
                                          section_b.Subtotal,
                                          section_c.Subtotal,
                                          section_d.Subtotal,
                                          totalScore
                                        ],
                                        (error, result) => {
                                          if (error) {
                                            return res.status(500).json({
                                              status: 1,
                                              message: error
                                            });
                                          }
                                          return res.status(200).json({
                                            status: 0,
                                            message: "success",
                                            subtotal: [
                                              section_a,
                                              section_b,
                                              section_c,
                                              section_d
                                            ],
                                            GrandTotal: totalScore
                                          });
                                        }
                                      );
                                    }
                                  })
                                  .catch(error => {
                                    console.log(
                                      `calculate-score select marital_status catch - ${error.message}`
                                    );
                                    return res.status(500).json({
                                      status: 1,
                                      message: error.message
                                    });
                                  });
                              })
                              .catch(error => {
                                console.log(
                                  `score-calculator route select canadian_education error - ${error}`
                                );
                                return res
                                  .status(500)
                                  .json({ status: 1, message: error });
                              });
                          })
                          .catch(error => {
                            console.log(
                              `score-calculator route select additional error - ${error}`
                            );
                            return res
                              .status(500)
                              .json({ status: 1, message: error });
                          });
                      })
                      .catch(error => {
                        console.log(
                          `score-calculator route select foreign_education error - ${error}`
                        );
                        return res
                          .status(500)
                          .json({ status: 1, message: error });
                      });
                  })
                  .catch(error => {
                    console.log(
                      `score-calculator route select c_education error - ${error}`
                    );
                    return res.status(500).json({ status: 1, message: error });
                  });
              })
              .catch(error => {
                console.log(
                  `score-calculator route select canadian_experience error - ${error}`
                );
                return res.status(500).json({ status: 1, message: error });
              });
          })
          .catch(error => {
            console.log(`score-calculator route select ielts error - ${error}`);
            return res.status(500).json({ status: 1, message: error });
          });
        // return res.status(500).json({status:0,message:educationScore});
      })
      .catch(error => {
        console.log(`score-calculator route select education error - ${error}`);
        return res.status(500).json({ status: 1, message: error });
      });
  } catch (error) {
    console.log(`score-calculator catch - ${error.message}`);
    return res.status(500).json({ status: 1, message: error });
  }
});

const selectQuery = (table, column, values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${[...column]} FROM ${table} WHERE user_id=?`,
      values,
      (error, result) => {
        if (error) {
          reject(error.message);
        }
        resolve(result);
      }
    );
  });
};
module.exports = router;

// console.log(`\n          Education Score-${educationScore} \n
//                         Language Score - ${languageScore} \n
//                         Canadian Work Experience Score - ${canadianWorkExperienceScore}\n
//                         TransFerable with Education - ${c_educationScore}\n
//                         Transferable with foreign experience - ${c_foreignWorkScore}`);
