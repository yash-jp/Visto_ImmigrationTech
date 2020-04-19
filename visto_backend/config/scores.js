const educationPointsWS = {
  "none" :0,
  "secondary" :28,
  "one-year":84,
  "two-year":91,
  "bachelors":112,
  "twoOrMoreCertificates":119,
  "masters":126,
  "doctoral":140,
}

const educationPointsWhS = {
  "none" :0,
  "secondary" :30,
  "one-year":90,
  "two-year":98,
  "bachelors":120,
  "twoOrMoreCertificates":128,
  "masters":135,
  "doctoral":150,
}

const CLBPointsWS = {
  "3":0,
  "4":6,
  "5":6,
  "6":8,
  "7":16,
  "8":22,
  "9":29,
  "10":32,
  "11":32,
  "12":32
}

const CLBPointsWhS = {
  "3":0,
  "4":6,
  "5":6,
  "6":9,
  "7":17,
  "8":23,
  "9":31,
  "10":34,
  "11":34,
  "12":34
}

const canadianEducationWCLB7 = {
  "secondary":0,
  "post-secondary":13,
  "two-post-secondary":25,
  "masters":25,
  "doctoral":25
}

const canadianEducationWCLB9 = {
  "secondary":0,
  "post-secondary":25,
  "two-post-secondary":50,
  "masters":50,
  "doctoral":50
}

canadianEducationWWork1 = {
  "secondary":0,
  "post-secondary":13,
  "two-post-secondary":25,
  "masters":25,
  "doctoral":25
}

canadianEducationWWork2 = {
  "secondary":0,
  "post-secondary":25,
  "two-post-secondary":50,
  "masters":50,
  "doctoral":50
}

canadianEducation = {
  "secondary":0,
  "one_or_two":15,
  "three_or_more_or_masters":30
}

canadianExperienceWS = {
  "none or less than a year":0,
  "1 year":35,
  "2 years":46,
  "3 years":56,
  "4 years":63,
  "5 years or more":70
}

canadianExperienceWhS = {
  "none or less than a year":0,
  "1 year":40,
  "2 years":53,
  "3 years":64,
  "4 years":72,
  "5 years or more":80
}

ageWS = {
  "17":0,
  "18":90,
  "19":95,
  "20":100,
  "21":100,
  "22":100,
  "23":100,
  "24":100,
  "25":100,
  "26":100,
  "27":100,
  "28":100,
  "29":100,
  "30":95,
  "31":90,
  "32":85,
  "33":80,
  "34":75,
  "35":70,
  "35":65,
  "37":60,
  "38":55,
  "39":50,
  "40":45,
  "41":35,
  "42":25,
  "43":15,
  "44":5,
  "45":0
}

ageWhS = {
  "17":0,
  "18":99,
  "19":105,
  "20":110,
  "21":110,
  "22":110,
  "23":110,
  "24":110,
  "25":110,
  "26":110,
  "27":110,
  "28":110,
  "29":110,
  "30":105,
  "31":99,
  "32":94,
  "33":88,
  "34":83,
  "35":77,
  "35":72,
  "37":66,
  "38":61,
  "39":55,
  "40":50,
  "41":39,
  "42":28,
  "43":17,
  "44":6,
  "45":0
}


// SPOUSE scores
spouseEducation = {
  "none" :0,
  "secondary" :2,
  "one-year":6,
  "two-year":7,
  "bachelors":8,
  "twoOrMoreCertificates":9,
  "masters":10,
  "doctoral":10,
}

spouseCLBPoints = {
  "3":0,
  "4":0,
  "5":1,
  "6":1,
  "7":3,
  "8":3,
  "9":5,
  "10":5,
  "11":5,
  "12":5
}

spouseWorkExperience = {
  "none or less than a year":0,
  "1 year":5,
  "2 years":7,
  "3 years":8,
  "4 years":9,
  "5 years or more":10
}


// education
module.exports.educationPointsWS=educationPointsWS;
module.exports.educationPointsWhS=educationPointsWhS;

// CLB
module.exports.CLBPointsWS = CLBPointsWS;
module.exports.CLBPointsWhS = CLBPointsWhS;

// canadian education
module.exports.canadianEducation = canadianEducation;

// canadian experience
module.exports.canadianExperienceWS = canadianExperienceWS;
module.exports.canadianExperienceWhS = canadianExperienceWhS;

// age
module.exports.ageWS = ageWS;
module.exports.ageWhS = ageWhS;

// spouseEducation, CLB and Work Experience
module.exports.spouseEducation=spouseEducation;
module.exports.spouseCLBPoints=spouseCLBPoints;
module.exports.spouseWorkExperience=spouseWorkExperience;