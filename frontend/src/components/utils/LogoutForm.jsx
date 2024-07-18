import React, { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Typography } from "@mui/material";

import { AuthContext } from "../../context/Auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height : 140,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export default function LogoutForm({ setShowDialog }) {
  const [open, setOpen] = useState(true);
  const auth = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    auth.logout();
    setShowDialog("");
  };

  const handleClose = () => {
    setOpen(false);
    setShowDialog("");
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              borderRadius: "17px",
            }}
          >
            <Typography>Are you sure want to logout?</Typography>
            <span>
              <Button
                sx={{ width: "40%", margin: "10px" }}
                variant="contained"
                onClick={handleFormSubmit}
              >
                Yes
              </Button>
              <Button
                sx={{ width: "40%", margin: "10px" }}
                variant="outlined"
                onClick={handleClose}
              >
                No
              </Button>
            </span>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
