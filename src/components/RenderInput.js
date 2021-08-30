import React from "react";
import { TextField } from "@material-ui/core";

const RenderInput = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="mt-3">
      <TextField
        {...input}
        label={label}
        type={type}
        variant="outlined"
        error={Boolean(touched && error)}
        helperText={touched && error}
        className="w-full"
      />
    </div>
  );
};

export default RenderInput;
