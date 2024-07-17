import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
function ForgotPassword({ setShowDialog }) {
  const [open, setOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });

  const auth = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
    setShowDialog("");
  };

  const handleSendPassword = async () => {
    await axios
      .post("http://localhost:5000/user/forgotPassword", formData)
      .then((response) => {
        auth.setMessage(response.data.message);
        handleClose();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message)
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {errorMessage && <Alert severity="error" >{errorMessage}</Alert>}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "100%",
              borderRadius: "17px",
            }}
          >
            <h1>Forgot Password</h1>
            <TextField
              sx={{ margin: "5px 0px" }}
              label="Email"
              variant="standard"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevValues) => ({
                  ...prevValues,
                  email: e.target.value,
                }))
              }
            />
          </Box>
          <div>
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              onClick={handleSendPassword}
            >
              Send Password
            </Button>
            <Button
              sx={{ width: "40%", margin: "10px" }}
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
