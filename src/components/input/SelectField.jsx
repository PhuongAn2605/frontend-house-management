import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import styled from "styled-components";

const ErrorText = styled.div`
  color: red;
`;

const SelectField = ({
  id,
  value,
  onChange,
  label,
  input,
  meta: { touched, error, invalid },
  children,
  ...custom
}) => {
  return (
    <Box sx={{ maxWidth: 200 }} style={{ margin: "auto" }}>
      <FormControl style={{ minWidth: 420 }} size="large">
        <InputLabel id="demo-simple-select-label">Chọn chức năng</InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          // value={value}
          // label="Chọn chức năng"
          // onChange={onChange}
          native
          label={label}
          error={touched && invalid}
          {...input}
          {...custom}
          inputProps={{
            name: "functions",
            id: "functions",
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {children}
        </Select>
        {touched && error && <ErrorText>{error}</ErrorText>}
      </FormControl>
    </Box>
  );
};

export default SelectField;
