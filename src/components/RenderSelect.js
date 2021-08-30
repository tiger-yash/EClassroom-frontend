import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const RenderSelect = props => {
  const {
    input,
    options,
    label,
    meta: { touched, error }
  } = props;
  console.log(`${input.name}-label`);
  const labelId = `${input.name}-label`;

  return (
    <div className="mt-3">
      <FormControl variant="outlined" error={touched && error} className="w-full">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select labelId={labelId} label="Age" {...input}>
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option !== "" ? option : "Select A Role"}
            </MenuItem>
          ))}
        </Select>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default RenderSelect;
