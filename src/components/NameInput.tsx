import TextField from "@mui/material/TextField";

interface INameInputProps {
  onChange: (value: string) => void;
}
export function NameInput(props: INameInputProps) {
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
