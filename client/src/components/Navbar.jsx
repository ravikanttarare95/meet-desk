import React from "react";
import { Link, useNavigate } from "react-router";
import Button from "./form_components/Button.jsx";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50  bg-white/80 backdrop-blur border-b border-gray-200">
      <div
        className={`${
          window.location.pathname === "/" ? "max-w-7xl" : "max-w-3xl"
        }  mx-auto px-4 h-16 flex items-center justify-between`}
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-violet-600">MeetDesk</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user && (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-violet-600 transition"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-violet-600 transition"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!user ? (
            <Button
              btnVariant="primary"
              size="sm"
              btnTitle="Login"
              onBtnClick={() => {
                navigate("authenticate");
              }}
              customStyle="font-semibold!"
            />
          ) : (
            <>
              <Button
                btnVariant="primary"
                btnTitle="Share Link"
                size="sm"
                onBtnClick={() => navigate(`/book/${user.id}`)}
                customStyle="font-semibold!"
              />
              <Button
                btnVariant={"secondary"}
                btnTitle={"Logout"}
                size="sm"
                onBtnClick={handleLogout}
                customStyle="font-semibold!"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
