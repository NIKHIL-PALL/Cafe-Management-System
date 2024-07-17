import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  
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

function createData(name, category, quantity, price) {
  return { name, category, quantity, price };
}

const products = [
  createData("Frozen yoghurt", "fruits", 4, 688),
  createData("Frozen yoghurt", "fruits", 4, 688),
  createData("Frozen yoghurt", "fruits", 4, 688),
  createData("Frozen yoghurt", "fruits", 4, 688),
  createData("Frozen yoghurt", "fruits", 4, 688),
  createData("Frozen yoghurt", "fruits", 4, 688),
  createData("Frozen yoghurt", "fruits", 4, 688),
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

function ManageOrder() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    paymentMethod: "",
    category: "",
    product: "",
  });

  const handlepaymentMethodChange = (e) => {
    setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };
  const handleCategoryChange = (e) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };
  const handleProductChange = (e) => {
    setFormData((prev) => ({ ...prev, product: e.target.value }));
  };
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
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={formData.category}
                    label="Category"
                    // onChange={handleCategoryChange}
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
            <h2>Manage Order</h2>
          </span>
          <Button variant="contained" onClick={handleModalOpen}>
            Submit & Bill
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ margin: "10px 0px" }}>
        <CardHeader title="Customer Details" />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="payment-method-label">
                  Payment Method
                </InputLabel>
                <Select
                  id="payment-method-select"
                  labelId="payment-method-label"
                  value={formData.paymentMethod}
                  label="Payment Method"
                  onChange={handlepaymentMethodChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ margin: "10px 0px" }}>
        <CardHeader title="Select Product" />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  id="category-select"
                  labelId="category-label"
                  value={formData.category}
                  label="Payment Method"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                  id="product-select"
                  labelId="product-label"
                  value={formData.product}
                  label="Payment Method"
                  onChange={handleProductChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Price"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                sx={{ width: "100%" }}
                label="Quantity"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Total"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box
          component={"div"}

            sx={{
              width : "100%",
              marginTop : "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button sx={{ display: "inline-block" }} variant="contained">
              Add
            </Button>
            <Button variant="contained" disabled>
              Total Amount : {99899}{" "}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Delete</TableCell>
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
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">
                  {product.price * product.quantity}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <DeleteIcon />
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

export default ManageOrder;
