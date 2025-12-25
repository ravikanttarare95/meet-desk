import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "./../components/form_components/Button.jsx";
import { useNavigate } from "react-router";
import HowItWork from "./../home-data/howItWorksSteps.js";
import WhyFeatures from "./../home-data/homeFeatures.js";
import HomeFeaturesCard from "./../components/homeComponents/HomeFeaturesCard.jsx";
import HowItWorkCard from "./../components/homeComponents/HowItWorkCard.jsx";
import H2 from "./../components/H2.jsx";
import Navbar from "./../components/Navbar.jsx";
import Footer from "./../components/Footer.jsx";

function Home() {
  const [user] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Schedule meetings <br />
            <span className="text-violet-600">without back-and-forth</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Share your booking link, let others pick a time that works for you,
            and get booked instantly.
          </p>

          <div className="flex gap-4">
            <Button
              btnVariant="primary"
              btnTitle="Get Started Free"
              onBtnClick={() => {
                navigate("/authenticate");
              }}
            />
            <Button
              btnVariant="secondary"
              btnTitle="Meet Now"
              onBtnClick={() => {
                navigate(`/book/${user?.id}`);
              }}
            />
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <img
            src="https://ik.imagekit.io/vby7pddwy/book-home__v9k2BVJc.png?updatedAt=1766660638406"
            alt="Booking illustration"
            className="w-full max-w-md"
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <H2 headingTitle={"How it works"} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HowItWork.map((item) => (
            <HowItWorkCard
              key={item.step}
              workStep={item.step}
              workTitle={item.work}
              worlkDesc={item.desc}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <H2 headingTitle={"  Why use this app?"} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WhyFeatures.map((item, idx) => (
              <HomeFeaturesCard
                key={idx}
                featureIcon={item.icon}
                featureTitle={item.title}
                featureDesc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
