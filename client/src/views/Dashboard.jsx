import { Link } from "react-router";
import Navbar from "./../components/Navbar.jsx";
import Footer from "./../components/Footer.jsx";
import H1 from "./../components/H1.jsx";
import AdminAvailability from "./AdminAvailability.jsx";
import AdminBookings from "./AdminBookings.jsx";
import { useState } from "react";
import Button from "../components/form_components/Button.jsx";

function Dashboard() {
  const [dashView, setDashView] = useState("availability");
  return (
    <>
      <Navbar />
      <div className="max-w-3xl p-4 mx-auto ">
        <H1 headingTitle={"Admin Dashboard"} />

        <div className="space-x-6 mt-4">
          <Button
            btnVariant={"primary"}
            btnTitle={"Availability"}
            onBtnClick={() => {
              setDashView("availability");
            }}
          />
          <Button
            btnVariant={"secondary"}
            btnTitle={"Bookings"}
            onBtnClick={() => {
              setDashView("bookings");
            }}
          />
        </div>
      </div>
      {dashView === "availability" ? (
        <AdminAvailability />
      ) : dashView === "bookings" ? (
        <AdminBookings />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default Dashboard;
