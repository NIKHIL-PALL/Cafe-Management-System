import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

export default function SignUp({setShowDialog}) {
  const [open, setOpen] = React.useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber : "" ,
  });

  //Handle Form Submit
  const handleFormSubmit = () => {
    console.log(formData);
   
  };


  //Hanlde modal close
  const handleClose = () => {
    setOpen(false);
    setShowDialog("")
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "60%",
              borderRadius: "17px",
            }}
          >
            <h1>SignUp</h1>
            <TextField
              sx={{ margin: "5px 0px" }}
              label="Name"
              variant="standard"
              value={formData.name}
              onChange={(e) =>
                setFormData((prevValues) => ({
                  ...prevValues,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              sx={{ margin: "5px 0px" }}
              label="Contact Number"
              type="number"

              variant="standard"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData((prevValues) => ({
                  ...prevValues,
                  contactNumber: e.target.value,
                }))
              }
            />
            <TextField
              sx={{ margin: "5px 0px" }}
              label="Email"
              variant="standard"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevValues) => ({ ...prevValues, email: e.target.value }))
              }
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                sx={{ width: "100%" }}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevValues) => ({
                    ...prevValues,
                    password: e.target.value,
                  }))
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box >
            <Button
              sx={{ width: "40%", margin: "10px" , display : "inline-block" }}
              variant="contained"
              onClick={handleFormSubmit}
            >
              SignUp
            </Button>
            <Button

              sx={{ width: "40%", margin: "10px", display : "inline-block" }}
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
