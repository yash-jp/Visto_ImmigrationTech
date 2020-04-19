import React from "react";

import SignupPage from "./pages/auth/signup.js";
import LoginPage from "./pages/auth/login.js";
import LevelOfEducation from "./components/educationlevel";
import AgeOfUser from "./components/agecomponent";
import EditUser from "./components/Edit_User";
import Calculator from "./pages/calculator.js";
import IELTS from "./components/ielts";
import adminPage from "./pages/adminPage.js";
import UserDashboard from "./pages/userdashboard";
import CanadianDegree from "./components/educationlevel/canadiandegree";
import AdditionalPoints from "./components/additionalpoints";
import WorkExperience from "./components/workexperience";
import ForeignSkillExperience from "./components/workexperience/foreignskilledexperience";
import CertificateOrQualification from "./components/certificateorqualification";
import FinalScorePage from "./components/finalScorePage";
import CadEduUpdate from "./pages/update/cadedu_userdashboard";
import CadForeignEduUpdate from "./pages/update/foreignedu";
import ForeignWorkExp from "./pages/update/foreign_work_exp";
import UpdateCadWorkExp from "./pages/update/cad_work_exp";
import LanguageScore from "./pages/update/official_language_score";
import UpdateAdditional from "./pages/update/update_additional_points";
import Spouse from "./components/spouse";
import RightComponent from "./components/userdashboard/rightComponent";
import UserItem from "./components/admindashboard/UserItem";
import UserInfo from "./components/ContactItem/user_info";
import FileNotFOund from "./components/filenotfound";
import UserDashboardWithoutIELTS from "./components/userdashboard/noieltsdashboard";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/style.css";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/calculator" component={Calculator} />

        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/levelofedu" component={LevelOfEducation} />

        <Route exact path="/ielts" component={IELTS} />
        <Route exact path="/workexperience" component={WorkExperience} />
        <Route exact path="/additionalpoints" component={AdditionalPoints} />
        <Route exact path="/cadedu" component={CanadianDegree} />
        <Route exact path="/cadeduupdate" component={CadEduUpdate} />
        <Route
          exact
          path="/cadforeigneduupdate"
          component={CadForeignEduUpdate}
        />
        <Route exact path="/updateforeignworkexp" component={ForeignWorkExp} />
        <Route exact path="/updatecadworkexp" component={UpdateCadWorkExp} />
        <Route exact path="/updatelanguage" component={LanguageScore} />
        <Route exact path="/updateadditional" component={UpdateAdditional} />
        <Route exact path="/finalPage" component={FinalScorePage} />
        <Route exact path="/adminPage" component={adminPage} />
        <Route exact path="/EditUser/:id" component={EditUser} />
        <Route
          exact
          path="/foreignworkexp"
          component={ForeignSkillExperience}
        />
        <Route exact path="/RightComponent" component={RightComponent} />
        <Route
          exact
          path="/signup"
          component={SignupPage}
          // render={signup => <SignupPage></SignupPage>}
        />
        <Route exact path="/userinfo" component={UserInfo} />
        <Route
          exact
          path="/certificateorqualification"
          component={CertificateOrQualification}
        />
        <Route
          exact
          path="/noIeltsDashboard"
          component={UserDashboardWithoutIELTS}
        />
        <Route exact path="/userdashboard" component={UserDashboard} />

        <Route exact path="/spouse" component={Spouse} />
        <Route exact path="/useritem" component={UserItem} />

        <Route component={FileNotFOund}></Route>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
