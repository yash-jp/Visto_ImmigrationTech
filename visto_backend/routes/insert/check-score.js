const express = require("express");
const router = express.Router();
const { connection } = require("../../config/dbConnect");

// Dependencies
const {educationCalculator} = require('../../models/education');
const {CLBCalculator} = require('../../models/ielts');
const {canadianEducationCalculator} = require('../../models/canadianEducation');
const {canadianExperienceCalculator,canadianExperienceYearsConverter} = require('../../models/canadianExperience');
const { educationTransferablePointsCLB,experienceTransferablePointsCLB } = require('../../models/invisible');
const {calculateWithCanadianExperience,calculateWithCLB} = require('../../models/foreignExperience');
const {
  ageCalculator,
  NOCCalculator,
  immediateRelativeCalculator,
  provincialNominationCalculator
} = require("../../models/additional");
const auth = require('../../middleware/auth');


router.get('/',auth,async (req,res)=>{
  const user_id = req.user.user_id;

  let section_a = {},
    section_b = {},
    section_c = {},
    section_d = {};

  let spouse_coming_canada=1;

  let levelOfEducation='';
  let clb='';
  let canadianLevelOfEducation='';
  let canadianExperience='';
  let canadianExperienceInYears=0;
  let foreignExperience='';
  let foreignExperienceInYears=0;
  let age='';
  let certificationOfQualification='';
  let nocLevel='';
  let provincialNomination='';
  let immediateRelative='';
   
  let educationScore=0;
  let ieltsScore=0;
  let canadianEducationScore=0;
  let canadianExperienceScore=0; 
  let educationWithCLBScore=0;
  let educationWithExperienceScore=0;
  let c_educationScore=0;
  let foreignExperienceScore=0;
  let ageScore;
  let certificationOfQualificationScore=0;
  let nocLevelScore=0;
  let provincialNominationScore=0;
  let immediateRelativeScore=0;
  let spouseScore=0;
  let score=0;
  // first get the spouse_coming or not and store it in variable
  try{
    selector('marital_status',['spouse_coming_canada'],[user_id])
    .then(result=>{
      spouse_coming_canada = result[0]['spouse_coming_canada'];

      // now to check education we want level_of_education
      selector('education',['level_of_education'],[user_id])
      .then(result=>{
        levelOfEducation=result[0]['level_of_education'];

        // now we want to calculate education score
        educationScore = educationCalculator(levelOfEducation,spouse_coming_canada);

        // update education table with latest score
        updater('education',[educationScore,user_id])
        .then(result=>{
          
          // now get clb from ielts
          selector('ielts',['clb'],[user_id])
          .then(result=>{
            clb = result[0]['clb'];

            // calculate IELTS SCORE
            // FIXME hardcoded multiplied by 4
            ieltsScore = CLBCalculator(clb,spouse_coming_canada)*4;

            // update ielts score
            updater(`ielts`,[ieltsScore,user_id])
            .then(result=>{

              // get level_of_education from canadian_education table
              selector('canadian_education',['level_of_education'],[user_id])
              .then(result=>{
                canadianLevelOfEducation=result[0]['level_of_education'];

                // calculate score
                canadianEducationScore = canadianEducationCalculator(canadianLevelOfEducation,spouse_coming_canada);

                // update score in canadian_education table
                updater(`canadian_education`,[canadianEducationScore,user_id])
                .then(result=>{
                  // proceed further with canadian-experience

                  selector(`canadian_experience`,['canadian_experience'],[user_id])
                  .then(result=>{
                    canadianExperience=result[0]['canadian_experience'];

                    // calculate canadian_experience in years
                    canadianExperienceInYears = canadianExperienceYearsConverter(canadianExperience);

                    // calculate experience score
                    canadianExperienceScore=canadianExperienceCalculator(canadianExperience,spouse_coming_canada);

                    // update canadian_experience score
                    updater(`canadian_experience`,[canadianExperienceScore,user_id])
                    .then(result=>{
                      // proceed with c_education logic
                      educationWithCLBScore=educationTransferablePointsCLB(levelOfEducation,clb);
                      educationWithExperienceScore = experienceTransferablePointsCLB(levelOfEducation,canadianExperienceInYears);

                      if(educationWithCLBScore===50 || educationWithExperienceScore===50  ){
                        c_educationScore=50;
                      }else{
                        c_educationScore=educationWithCLBScore+educationWithExperienceScore;
                      }

                      // now update it in c_education table
                      connection.query(`UPDATE c_education SET with_clb=?, with_cad_exp=?,score=? WHERE user_id=?`,[educationWithCLBScore,educationWithExperienceScore,c_educationScore,user_id],(error,result)=>{
                        if(error){
                          console.log(`check-score upate c_education catch - ${error.message}`);
                          return res.status(500).json({ status: 1, message: "Internal Server Error"});
                        }

                        // proceed with foreign experience get experience in string and years
                        selector(`foreign_experience`,['foreign_experience','years'],[user_id])
                        .then(result=>{
                          foreignExperience = result[0]['foreign_experience'];
                          foreignExperienceInYears = result[0]['years'];

                          let foreignExpScoreWithCLB = calculateWithCLB(foreignExperienceInYears,parseInt(clb));
                          let foreignExpScoreWithCadExp = calculateWithCanadianExperience(foreignExperienceInYears,canadianExperienceInYears);
                          
                          if(foreignExpScoreWithCLB===50||foreignExpScoreWithCadExp===50){
                            foreignExperienceScore=50;
                          }else{
                            foreignExperienceScore=foreignExpScoreWithCLB+foreignExpScoreWithCadExp;
                          }

                          updater(`foreign_experience`,[foreignExperienceScore,user_id])
                          .then(result=>{
                            
                            // proceed with additional table
                            selector(`additional`,['age','certification_of_qualification','noc_level','provincial_nomination','immediate_relative'],[user_id]
                            )
                            .then(result=>{ 
                              age=result[0]['age'];
                              certificationOfQualification=result[0]['certification_of_qualification'];
                              nocLevel=result[0]['noc_level'];
                              provincialNomination=result[0]['provincial_nomination'];
                              immediateRelative=result[0]['immediate_relative'];

                              ageScore=ageCalculator(age,spouse_coming_canada);
                              
                              if(clb>=7&&certificationOfQualification==='certification_of_qualification_yes'){
                                certificationOfQualificationScore=50;
                              }else if(clb>=5&&certificationOfQualification==='certification_of_qualification_yes'){
                                certificationOfQualificationScore=25;
                              }

                              nocLevelScore = NOCCalculator(nocLevel);

                              provincialNominationScore=provincialNominationCalculator(provincialNomination);

                              immediateRelativeScore = immediateRelativeCalculator(immediateRelative);

                              connection.query(`UPDATE additional SET age_score=?,certification_of_qualification_score=?,
                              noc_level_score=?,
                              provincial_nomination_score=?,
                              immediate_relative_score=?
                              WHERE user_id=?`,[ageScore,certificationOfQualificationScore,nocLevelScore,provincialNominationScore,immediateRelativeScore,user_id],(error,result)=>{
                                if(error){
                                  console.log(`check-score update additional catch - ${error}`);
                                  return res.status(500).json({ status: 1, message: "Internal Server Error"});
                                }

                                // spouse section

                                selector('spouse',['score'],[user_id])
                                .then(result=>{
                                  // spouseScore = result[0]['score'];

                                  if(spouse_coming_canada===0){
                                    spouseScore=result[0]['score'];
                                  }

                                // proceed with rest of the logic
                                // now here we have everyting
                                section_a = {
                                  Age: ageScore,
                                  "Level of Education": educationScore,
                                  "Official languages proficiency": ieltsScore,
                                  "Canadian work experience": canadianExperienceScore,
                                  Subtotal:
                                    ageScore +
                                    educationScore +
                                    ieltsScore +
                                   canadianExperienceScore
                                };

                                section_b = {
                                  "Spouse Factors": spouseScore,
                                  Subtotal: spouseScore
                                };

                                section_c = {
                                  Education: c_educationScore,
                                  "Foreign work experience": foreignExperienceScore,
                                  "Certificate of qualification": certificationOfQualificationScore,
                                  Subtotal:
                                    c_educationScore +
                                    foreignExperienceScore +
                                    certificationOfQualificationScore
                                };

                                section_d = {
                                  "Provincial nomination": provincialNominationScore,
                                  "Job offer": nocLevelScore,
                                  "Study in Canada": canadianEducationScore,
                                  "Sibling in Canada": immediateRelativeScore,
                                  Subtotal:
                                    provincialNominationScore +
                                    nocLevelScore +
                                    canadianEducationScore +
                                    immediateRelativeScore
                                };

                                score =
                                  section_a.Subtotal +
                                  section_b.Subtotal +
                                  section_c.Subtotal +
                                  section_d.Subtotal;

                                  connection.query(`UPDATE score SET section_a=?,
                                  section_b=?,
                                  section_c=?,
                                  section_d=?,
                                  crs_score=? WHERE user_id=?`,
                                  [  
                                    section_a.Subtotal,
                                    section_b.Subtotal,
                                    section_c.Subtotal,
                                    section_d.Subtotal,
                                    score,
                                    user_id
                                  ],
                                  (error,result)=>{
                                    if(error){
                                      console.log(`check-score update score catch - ${error}`);
                                      return res.status(500).json({ status: 1, message: "Internal Server Error"});
                                    }
                                  });

                                  return res
                                  .status(200)
                                  .json({
                                    status: 0,
                                    message: "success",
                                    subtotal: [
                                      section_a,
                                      section_b,
                                      section_c,
                                      section_d
                                    ],
                                    GrandTotal: score
                                  });
                                  
                                })
                                .catch(error=>{
                                  console.log(`check-score select spouse catch - ${error}`);
                                  return res.status(500).json({ status: 1, message: "Internal Server Error"});
                                });
                                
                                                        });
                            })
                            .catch(error=>{
                              console.log(`check-score select additional catch - ${error}`);
                              return res.status(500).json({ status: 1, message: "Internal Server Error"});
                            });
                          })
                          .catch(error=>{
                            console.log(`check-score update foreign_experience catch - ${error}`);
                            return res.status(500).json({ status: 1, message: "Internal Server Error"});
                          });


                        })
                        .catch(error=>{
                          console.log(`check-score select foreign_experience catch - ${error.message}`);
                          return res.status(500).json({ status: 1, message: "Internal Server Error"});
                        })

                      })
                    })
                    .catch(error=>{
                      console.log(`check-score upate canadian_experience catch - ${error.message}`);
                      return res.status(500).json({ status: 1, message: "Internal Server Error"});
                    });

                  })
                  .catch(error=>{
                    console.log(`check-score select canadian_experience catch - ${error.message}`);
                    return res.status(500).json({ status: 1, message: "Internal Server Error"});
                  });
                })
                .catch(error=>{
                  console.log(`check-score update canadian_education catch - ${error.message}`);
                  return res.status(500).json({ status: 1, message: "Internal Server Error"});
                });

              })
              .catch(error=>{
                console.log(`check-score select canadian_education catch - ${error.message}`);
                return res.status(500).json({ status: 1, message: "Internal Server Error"});
              })
            })
            .catch(error=>{
              console.log(`check-score update ielts catch - ${error.message}`);
              return res.status(500).json({ status: 1, message: "Internal Server Error"});
            });
          })
          .catch(error=>{
            console.log(`check-score select ielts catch - ${error.message}`);
            return res.status(500).json({ status: 1, message: "Internal Server Error"});
          });
        })
        .catch(error=>{
          console.log(`check-score update education score catch - ${error.message}`);
          return res.status(500).json({ status: 1, message: "Internal Server Error"});
        });
      })
      .catch(error=>{
        console.log(`check-score select education catch - ${error.message}`);
        return res.status(500).json({ status: 1, message: error.message});
      });
    })
    .catch(error=>{
      console.log(`check-score select marital_status catch - ${error.message}`);
      return res.status(500).json({ status: 1, message: error.message});
    });
  }catch(error){
    console.log(`check-score ROUTE main catch - ${error}`);
    return res.status(500).json({ status: 1, message: "Internal Server Error" });
  }
});

const selector = (table, column, values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${[...column]} FROM ${table} WHERE user_id=?`,
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

const updater = (table,values)=>{
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET score=? WHERE user_id=?`,
      values,
      (error, result) => {
        if (error) {
          reject(error.message);
        }
        resolve(result);
      }
    );
  });
}

module.exports = router;