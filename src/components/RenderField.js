import React from "react";

const RenderField = props => {
  return (
    <div>
      <h2 className="text-xl font-medium">{props.name}</h2>
      <p className="text-l">{props.value}</p>
    </div>
  );
};

export default RenderField;
