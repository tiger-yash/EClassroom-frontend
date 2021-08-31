import React from "react";
import { Link } from "react-router-dom";

const Logo = props => {
  const { to = "/", className } = props;
  return (
    <Link to={to} className={`${className} flex items-center`}>
      <img className="w-7 h-7 mr-3 mt-1 display-block" src="/images/logo.png" alt="logo" />
      <h1 className="text-xl">EClassroom</h1>
    </Link>
  );
};

export default Logo;
