import React from "react";
import SpendyLogo from "../assets/SpendyLogo.svg";

const Navbar = () => {
  return (
    <nav
      style={{
        maxHeight: "70px",
        padding: "20px 48px",
      }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <img src={SpendyLogo} style={{ height: "35px" }} alt="" />
    </nav>
  );
};

export default Navbar;
