import React, { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { AuthContext } from "../../context/Auth";

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

export default function ChangePassword({ setShowDialog }) {
  const [open, setOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const auth = useContext(AuthContext);

  const handleFormSubmit = async (e) => {

    if(formData.newPassword !== formData.confirmPassword) {
        setErrorMessage("New password and confirm password does not match.");
        return;
    }
    const headers = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${auth.userId}`
    }
    await axios
      .patch("http://localhost:5000/user/changePassword", formData, {headers})
      .then((response) => {
        auth.setMessage(response.data.message);
        handleClose();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setShowDialog("");
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "60%",
              borderRadius: "17px",
            }}
          >
            <h1>Change Password </h1>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="old-password">Old Password</InputLabel>
              <Input
                id="old-password"
                type={showPassword ? "text" : "password"}
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData((prevValues) => ({
                    ...prevValues,
                    oldPassword: e.target.value,
                  }))
                }
                sx={{ width: "100%" }}
                
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="new-password">New Password</InputLabel>
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData((prevValues) => ({
                    ...prevValues,
                    newPassword: e.target.value,
                  }))
                }
                sx={{ width: "100%" }}
                
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="confirm-password">
                Confirm Password
              </InputLabel>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prevValues) => ({
                    ...prevValues,
                    confirmPassword: e.target.value,
                  }))
                }
                sx={{ width: "100%" }}
                
              />
            </FormControl>
            <span>
              <Button
                sx={{ width: "40%", margin: "10px " }}
                variant="contained"
                onClick={handleFormSubmit}
              >
                Update
              </Button>
              <Button
                sx={{ width: "40%", margin: "10px" }}
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </span>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
