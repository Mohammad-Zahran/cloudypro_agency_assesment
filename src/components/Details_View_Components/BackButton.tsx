import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Button variant="contained" onClick={() => navigate("/")}>
        ← Back to Albums
      </Button>
    </Box>
  );
};

export default BackButton;
