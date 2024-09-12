import TextField, { TextFieldProps } from "@mui/material/TextField";

export const ModalTextInput: React.FC<TextFieldProps> = (props) => (
    <TextField margin="dense" fullWidth variant="standard" {...props} />
);
