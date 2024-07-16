import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
function createData(name, action) {
  return { name, action };
}

const rows = [
  createData("Frozen yoghurt", "action"),
  createData("Ice cream sandwich", "action"),
  createData("Eclair", "action"),
  createData("Ice cream sandwich", "action"),
  createData("Frozen yoghurt", "action"),
  createData("Eclair", "action"),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

function Category() {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleAddCategory = () => {
    console.log("handling adding...")
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ margin: "20px " }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Category
            </Typography>
            <TextField
            sx={{width : "100%", margin : "15px 0px"}}
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
            />
          </Box>
          <Box sx={{ margin: "5px" }}>
            <Button sx={{margin : "0px 10px"}} onClick={handleAddCategory} variant="contained">Add</Button>
            <Button sx={{margin : "0px 10px"}} onClick={handleClose}  variant="outlined">Close</Button>
          </Box>
        </Box>
      </Modal>

      <Card sx={{ margin: "10px 0px" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            <h2>Manage Category</h2>
          </span>
          <Button variant="contained" onClick={handleModalOpen}>
            Add Category
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ margin: "10px 0px" }}>
        <CardContent>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Filter"
            variant="outlined"
          />
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <EditIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default Category;
