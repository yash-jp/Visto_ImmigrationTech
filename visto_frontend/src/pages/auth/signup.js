import React from "react";
import Header from "../../components/header";
import SignUpForm from "../../components/auth/signup";
import Footer from "../../components/footer";

function SignupPage() {
  return (
    <>
      <div style={{ backgroundColor: "#2ddfff" }}>
        <Header />
        <SignUpForm />
        <Footer />
      </div>
    </>
  );
}

export default SignupPage;
