import React from "react";
import { DateTimePicker } from "@material-ui/pickers";

const RenderDate = ({ input, label, meta: { touched, error } }) => {
  return (
    <div className="mt-3">
      <DateTimePicker
        {...input}
        value={input.value ? input.value : null}
        label={label}
        variant="dialog"
        ampm={false}
        inputVariant="outlined"
        helperText={touched && error}
        error={Boolean(touched && error)}
        className=""
        okLabel="OK"
        format="yyyy-MM-dd hh:mm:ss"
      />
    </div>
  );
};

export default RenderDate;
