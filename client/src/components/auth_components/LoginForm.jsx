import { useState, useEffect } from "react";
import Button from "./../form_components/Button.jsx";
import Input from "./../form_components/Input.jsx";
import Label from "./../form_components/Label.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return toast.error("Please enter both email and password.", {
        id: "login-error",
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message, { id: "login-success" });
        if (response?.data?.user) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response?.data?.user)
          );
          localStorage.setItem("token", response.data.token);
        }
        setLoginData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      return toast.error(
        error?.response?.data?.message || "Something went wrong",
        {
          id: "login-error",
        }
      );
    }
  };

  useEffect(() => {
    const isValid = loginData?.email.trim() && loginData?.password.trim();

    setIsDisabled(!isValid);
  }, [loginData]);

  return (
    <form className="space-y-5" onSubmit={handleLoginSubmit}>
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
          value={loginData?.email}
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
          value={loginData?.password}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          btnTitle={"Login"}
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

export default LoginForm;
