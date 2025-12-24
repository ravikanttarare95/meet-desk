import React from "react";
import LoginForm from "./../components/auth_components/LoginForm.jsx";
import SignUpForm from "./../components/auth_components/SignUpForm.jsx";

function Authentication() {
  return (
    <div>
      <LoginForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
