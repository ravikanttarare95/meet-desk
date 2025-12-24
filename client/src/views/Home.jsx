import React, { useEffect, useState } from "react";
import Button from "./../components/form_components/Button.jsx";
import { useNavigate } from "react-router";

function Home() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );
  const navigate = useNavigate();

  return (
    <div>
      <Button
        btnTitle={"Book Now"}
        btnVariant={"primary"}
        onBtnClick={() => {
          navigate(`/book/${user.id}`);
        }}
      />
    </div>
  );
}

export default Home;
