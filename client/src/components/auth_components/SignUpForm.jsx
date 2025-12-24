import { useState, useEffect } from "react";
import Button from "../form_components/Button";
import Input from "../form_components/Input";
import Label from "../form_components/Label";
import toast from "react-hot-toast";
import axios from "axios";

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      return toast.error("Please fill in all required fields.", {
        id: "Sign-up-error",
      });
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      return toast.error("Passwords did not match.", {
        id: "registration-error",
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        signUpData
      );
      if (response) {
        toast.success(response?.data?.message, { id: "Registration-success" });
        setSignUpData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: "registration-error",
      });
    }
  };

  useEffect(() => {
    const isValid =
      signUpData.name.trim() &&
      signUpData.email.trim() &&
      signUpData.password.trim() &&
      signUpData.confirmPassword.trim();

    setIsDisabled(!isValid);
  }, [signUpData]);
  return (
    <form className="space-y-5" onSubmit={handleSignUp}>
      <div className="space-y-1">
        <Label
          htmlFor={"input-name"}
          labelTitle={"Enter Your Name"}
          isMandatory={true}
        />
        <Input
          id="input-name"
          type="text"
          name="name"
          placeholder="Ravikant Tarare"
          value={signUpData.name}
          onInputChange={handleInputChange}
        />
      </div>
      <div className="space-y-1">
        <Label
          htmlFor={"input-email"}
          labelTitle={"Email address"}
          isMandatory={true}
        />
        <Input
          id="input-email"
          type="email"
          name="email"
          placeholder="ravikanttarare2001@gmail.com"
          value={signUpData.email}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor={"input-password"}
          labelTitle={"Password"}
          isMandatory={true}
        />
        <Input
          id="input-password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={signUpData.password}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor={"input-confirm-password"}
          labelTitle={"Re-Enter Password"}
          isMandatory={true}
        />
        <Input
          id="input-confirm-password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={signUpData.confirmPassword}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          btnTitle={"Sign Up"}
          btnVariant="primary"
          size="md"
          isDisabled={isDisabled}
          customStyle={`w-full ${
            isDisabled ? "opacity-50 !cursor-not-allowed" : ""
          }`}
        />
      </div>
    </form>
  );
}

export default SignUpForm;
