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

export default function Login({ setShowDialog }) {
  const [open, setOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const auth = useContext(AuthContext);

  //Handling form submit
  const handleFormSubmit = async (e) => {
    await axios
      .post("http://localhost:5000/user/login", formData)
      .then((response) => {
        auth.setMessage(response.data.message)
        handleClose();
        auth.login(response.data.token, "user");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
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
       {errorMessage && <Alert severity="error" >{errorMessage}</Alert>}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "60%",
              borderRadius: "17px",
            }}
          >
            <h1>Login</h1>
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
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevValues) => ({
                    ...prevValues,
                    password: e.target.value,
                  }))
                }
                sx={{ width: "100%" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              sx={{ width: "40%", margin: "10px 0px" }}
              variant="contained"
              onClick={handleFormSubmit}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
