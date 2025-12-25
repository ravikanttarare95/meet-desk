import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/form_components/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-gray-100 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-extrabold text-rose-500 tracking-widest">
          404
        </h1>

        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-800">Page Not Found</p>
          <p className="text-gray-500 text-sm">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
        </div>
        <Button
          btnTitle={"Go to Home Page"}
          btnVariant={"primary"}
          onBtnClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

export default NotFound;
