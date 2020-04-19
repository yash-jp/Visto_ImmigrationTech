const createConnection = require('./config/dbConnect');
const express = require('express');
const config = require('config'); 
const cors = require('cors')

// routes

// calculator
const maritalStatus = require('./routes/insert/marital-status');
const spouseDetails = require('./routes/insert/spouse-details');
const education = require('./routes/insert/education');
const ielts = require('./routes/insert/ielts');
const canadianEducation = require('./routes/insert/canadian-education');
const canadianExperience = require('./routes/insert/canadian-experience');
const foreignExperience = require('./routes/insert/foreign-experience');
const invisible = require('./routes/insert/invisible');
const additional = require('./routes/insert/additional');
const updateScore = require('./routes/insert/check-score');
const scoreCalculator = require('./routes/insert/score-calcultor');
const getSpecificUserDetails = require('./routes/insert/user-check-score');

// admin operations
const adminOperations = require('./routes/admin/admin-operations');

// authentication
const signUp = require('./routes/auth/signUp');
const login = require('./routes/auth/login');

// misc
const misc = require('./routes/misc/misc');
/******************************************/

// this will create connection to database
createConnection();

const app = express();
app.use(cors());
app.use(express.json());

// SIGNUP AND LOGIN
/**************************************** */
// signup route
app.use('/api/auth/sign-up',signUp);

// login route
app.use('/api/auth/login',login);
/**************************************** */

// CALCULATOR
/******************************************************* */
// this route will be called for marital-status request
app.use('/api/marital-status',maritalStatus);

// this route will be called for education request
app.use('/api/education',education);

// this route will be called for canadian-education request
app.use('/api/canadian-education',canadianEducation);

// this route will be called for IELTS request
app.use('/api/ielts',ielts);

// this route will be called to add canadian experience
app.use('/api/canadian-experience',canadianExperience);

// this is invisible route it
// which is inserting into c_education tabel so once we have canadian experiecne we can do it
app.use('/api/invisible',invisible);

// this is for adding foreign experience
app.use('/api/foreign-experience',foreignExperience);

// this is for inserting age,nomination certificate,NOC type,immediate_sibling
app.use('/api/additional',additional);



// this route will be called for spouse-details
app.use('/api/spouse-details',spouseDetails);

// this route will be called for calculating score after insertion
// or else we can throw user to specific page which can not be redirected by user directly
app.use('/api/score',scoreCalculator);

// this route will be called for calculating/seeing score anytime after insertion
app.use('/api/check-score',updateScore);

// this is admin route all the operations of admins are here
app.use('/api/admin',adminOperations);

// this is admin route ato get the 
app.use('/api/admin/getUser',getSpecificUserDetails);

// MISCELLANIOUS
/********************************************************************* */
// this route will be called to check whether user has calculated score or not
app.use('/api/misc/',misc);
/********************************************************************* */

// start listening
app.listen(process.env.PORT, () => console.log(`visto lift off on port ${config.get('PORT')}!`));