import TextField from "@mui/material/TextField";

interface INameInputProps {
  onChange: (event) => void;
}
export function NameInput(props: INameInputProps = {}) {
  const { onChange } = props;

  return (
    <TextField
      id="name"
      label="Enter Your Name"
      variant="outlined"
      onChange={(event) => onChange(event.target.value)}
      required={true}
    />
  );
}
