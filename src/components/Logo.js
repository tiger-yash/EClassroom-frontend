import React from "react";
import { Link } from "react-router-dom";

const Logo = props => {
  const { to = "/", className } = props;
  return (
    <Link to={to} className={className}>
      <h1 className="text-xl">EClassroom</h1>
    </Link>
  );
};

export default Logo;
