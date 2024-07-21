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
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AuthContext } from "../../context/Auth";

function ManageOrder() {
  const [orderProduct, setOrderProduct] = useState({
    categoryId: "",
    category: "",
    name: "",
    price: "",
    quantity: 1,
    total: "",
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    totalAmount: 3000,
    paymentMethod: "",
  });
  const [categories, setCategories] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const auth = useContext(AuthContext);

  const handleAddProduct = () => {
    setOrderedProducts((prev) => [...prev, orderProduct]);
  };
  const handleGetBill = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    console.log("order product " + orderProduct);
    console.log("customer details " + customerDetails);
    try {
      const response = await axios.post(
        "http://localhost:5000/bill/generateBill",
        {
          ...customerDetails,
          productDetails: orderedProducts,
        },
        { headers }
      );

      const responseData = response.data;
      console.log("resp uuid: " + responseData.uuid);

      const pdfResponse = await axios.post(
        "http://localhost:5000/bill/getPdf",
        {
          ...customerDetails,
          productDetails: orderedProducts,
          uuid: responseData.uuid,
        },
        { headers, responseType: "blob" }
      );

      // Create a URL for the PDF blob and trigger the download
      const url = window.URL.createObjectURL(
        new Blob([pdfResponse.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf"); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error in handleGetBill:", error);
    }
  };

  const fetchAllProducts = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .get(
        `http://localhost:5000/product/getProductByCategory/${orderProduct.categoryId}`,
        { headers }
      )
      .then((response) => {
        setAvailableProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllCategories = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .get("http://localhost:5000/category/get", { headers })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const category = categories.find(
      (category) => category.id === orderProduct.categoryId
    );
    setOrderProduct((prev) => ({ ...prev, category: category?.name }));
  }, [orderProduct.categoryId]);

  useEffect(() => {
    fetchAllCategories();
  }, []);
  useEffect(() => {
    if (orderProduct.categoryId) {
      fetchAllProducts();
    }
  }, [orderProduct.categoryId]);
  return (
    <React.Fragment>
      {/* Bill section  */}
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
          <Button variant="contained" onClick={handleGetBill}>
            Submit & Bill
          </Button>
        </CardContent>
      </Card>

      {/* Customer Details */}
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
                value={customerDetails.name}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                variant="outlined"
                value={customerDetails.email}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                value={customerDetails.contactNumber}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({
                    ...prev,
                    contactNumber: e.target.value,
                  }))
                }
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
                  value={customerDetails.paymentMethod}
                  label="Payment Method"
                  onChange={(e) =>
                    setCustomerDetails((prev) => ({
                      ...prev,
                      paymentMethod: e.target.value,
                    }))
                  }
                >
                  <MenuItem value={"Cash"}>Cash</MenuItem>
                  <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                  <MenuItem value={"Debit Card"}>Debit Card</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Product Details  */}
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
            <Grid item xs={12} md={2.2}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  id="category-select"
                  labelId="category-label"
                  value={orderProduct.categoryId}
                  label="Category"
                  onChange={(e) =>
                    setOrderProduct((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                >
                  {categories.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2.2}>
              <FormControl fullWidth>
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                  id="product-select"
                  labelId="product-label"
                  value={orderProduct.name}
                  label="Product"
                  onChange={(e) =>
                    setOrderProduct((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                >
                  {availableProducts.length === 0 ? (
                    <MenuItem disabled>No products available</MenuItem>
                  ) : (
                    availableProducts.map((product) => (
                      <MenuItem key={product.id} value={product.name}>
                        {product.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2.2}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Price"
                variant="outlined"
                value={orderProduct.price}
                onChange={(e) =>
                  setOrderProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={2.2}>
              <TextField
                sx={{ width: "100%" }}
                label="Quantity"
                variant="outlined"
                value={orderProduct.quantity}
                onChange={(e) =>
                  setOrderProduct((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={2.2}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Total"
                disabled
                variant="outlined"
                value={orderProduct.quantity * orderProduct.price}
                onChange={(e) =>
                  setOrderProduct((prev) => ({
                    ...prev,
                    total: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ display: "inline-block" }}
              variant="contained"
              onClick={handleAddProduct}
            >
              Add
            </Button>
            <Button variant="contained" disabled>
              Total Amount : {customerDetails.totalAmount}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">CategoryId</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedProducts.map((product, index) => (
              <TableRow
                key={index}
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
