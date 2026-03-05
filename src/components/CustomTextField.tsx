import { TextField } from "@mui/material";

export default function CustomTextField(props: any) {
  return (
    <TextField
      fullWidth
      {...props}
      sx={{
        "& label.Mui-focused": {
          color: "#4fb66e",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4fb66e",
          },
          "&:hover fieldset": {
            borderColor: "#4fb66e",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4fb66e",
          },
        },
        ...(props.sx || {})
      }}
    />
  );
}