import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
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
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";
function createData(name, category, description, price) {
  return { name, category, description, price };
}

const products = [
  createData("Frozen yoghurt", "fruits", "A dklk f jsljl; sdlkjf  fdkld ", 688),
  createData(
    "Ice cream sandwich",
    "vegetables",
    "The klfdjkl  fhj jdflkfd  sje ;dlkd ",
    2300
  ),
  createData("Frozen yoghurt", "fruits", "A dklk f jsljl; sdlkjf  fdkld ", 688),
  createData(
    "Ice cream sandwich",
    "vegetables",
    "The klfdjkl  fhj jdflkfd  sje ;dlkd ",
    2300
  ),
  createData("Frozen yoghurt", "fruits", "A dklk f jsljl; sdlkjf  fdkld ", 688),
  createData(
    "Ice cream sandwich",
    "vegetables",
    "The klfdjkl  fhj jdflkfd  sje ;dlkd ",
    2300
  ),
  createData("Frozen yoghurt", "fruits", "A dklk f jsljl; sdlkjf  fdkld ", 688),
  createData(
    "Ice cream sandwich",
    "vegetables",
    "The klfdjkl  fhj jdflkfd  sje ;dlkd ",
    2300
  ),
  createData("Frozen yoghurt", "fruits", "A dklk f jsljl; sdlkjf  fdkld ", 688),
  createData(
    "Ice cream sandwich",
    "vegetables",
    "The klfdjkl  fhj jdflkfd  sje ;dlkd ",
    2300
  ),
  createData("Frozen yoghurt", "fruits", "A dklk f jsljl; sdlkjf  fdkld ", 688),
  createData(
    "Ice cream sandwich",
    "vegetables",
    "The klfdjkl  fhj jdflkfd  sje ;dlkd ",
    2300
  ),
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

function ManageProduct() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category : ""
  })

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({...prev, category : e.target.value}))
  }
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleAddCategory = () => {
    console.log("handling adding...");
  };
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
              Add Product
            </Typography>

            <Grid container spacing={2} sx={{ margin: "20px 0px" }}>
              <Grid item xs={8} md={12}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Name"
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Price"
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Description"
                ></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ margin: "5px" }}>
            <Button
              sx={{ margin: "0px 10px" }}
              onClick={handleAddCategory}
              variant="contained"
            >
              Add
            </Button>
            <Button
              sx={{ margin: "0px 10px" }}
              onClick={handleClose}
              variant="outlined"
            >
              Close
            </Button>
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
            <h2>Manage Product</h2>
          </span>
          <Button variant="contained" onClick={handleModalOpen}>
            Add Product
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
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <EditIcon />
                    <DeleteIcon />
                    <Switch />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ManageProduct;
