import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ProjectProps } from "./types";
import "./project.css";

export const Project = ({
  value,
  setValue,
  valueList,
  isInApp,
}: ProjectProps) => {
  return (
    <FormControl sx={{ m: "20px 0" }} className="project__wrapper">
      <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
      <Select
        sx={isInApp ? {} : { height: "40px", width: "150px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Project Name"
        onChange={(e) => setValue(e.target.value)}
      >
        {valueList.map((item, i) => {
          return (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
