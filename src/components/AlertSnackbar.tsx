import { Snackbar, Alert } from "@mui/material";

interface AlertSnackbarProps {
  alert: {
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  };
  onClose: () => void;
}

const AlertSnackbar = ({ alert, onClose }: AlertSnackbarProps) => (
  <Snackbar open={alert.open} autoHideDuration={3000} onClose={onClose}>
    <Alert onClose={onClose} severity={alert.type}>
      {alert.message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;
