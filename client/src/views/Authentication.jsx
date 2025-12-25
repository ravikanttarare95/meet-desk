import { useEffect, useState } from "react";
import Button from "./../components/form_components/Button.jsx";
import AuthPanelContent from "./../components/auth_components/AuthPanelContent.jsx";
import { authPanelContent } from "./../constants/authentication/authPanelContent.js";
import LoginForm from "./../components/auth_components/LoginForm.jsx";
import SignUpForm from "./../components/auth_components/SignUpForm.jsx";
import { useNavigate } from "react-router";

function Authentication() {
  const [activeView, setActiveView] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="relative flex p-6 justify-center pt-20">
      <div className="flex rounded-3xl shadow-2xl overflow-hidden bg-white max-w-3xl w-full">
        <div className="hidden md:flex w-2/3 bg-gradient-to-t from-violet-400 to-rose-400 text-white p-8 items-center justify-center">
          <div className="space-y-4 text-center">
            <AuthPanelContent
              title={authPanelContent[activeView].title}
              subtitle={authPanelContent[activeView].subtitle}
            />
          </div>
        </div>

        <div className=" p-8 space-y-6 w-full">
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              btnTitle="Login"
              btnVariant={activeView === "login" ? "primary" : "secondary"}
              size="md"
              customStyle="!w-full"
              onBtnClick={() => setActiveView("login")}
            />

            <Button
              type="button"
              btnTitle="Sign Up"
              btnVariant={activeView === "signup" ? "primary" : "secondary"}
              size="md"
              customStyle="!w-full"
              onBtnClick={() => setActiveView("signup")}
            />
          </div>

          <div className=" md:overflow-auto px-1 md:h-[265px]">
            {activeView === "login" && <LoginForm />}
            {activeView === "signup" && <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
