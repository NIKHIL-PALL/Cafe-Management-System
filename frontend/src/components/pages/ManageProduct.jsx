import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
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
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { AuthContext } from "../../context/Auth";

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
  const [openDelete, setOpenDelete] = useState(false);
  const [currentProductId, setCurrentProductId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const auth = useContext(AuthContext);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleSaveProduct = async () => {
    console.log(formData);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    if (isEditMode) {
      await axios
        .patch("http://localhost:5000/product/update", formData, { headers })
        .then((response) => {
          auth.setMessage(response.data.message);
          fetchAllProducts();
        })
        .catch((error) => {
          console.log(error);
        });
      setIsEditMode(false);
    } else {
      await axios
        .post("http://localhost:5000/product/add", formData, { headers })
        .then((response) => {
          console.log(response);
          auth.setMessage(response.data.message);

          fetchAllProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFormData({
      name: "",
      categoryId: "",
      price: "",
      description: "",
    });
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (productId) => {
    setOpenDelete(true);
    setCurrentProductId(productId);
  };
  const handleEditProduct = (product) => {
    setFormData(product);
    setIsEditMode(true);
    setOpen(true);
  };
  const handleUpdateStatus = async (productId, status) => {
    const headers = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${auth.userId}`
    }
    await axios
      .patch(
        "http://localhost:5000/product/updateStatus",
        { id: productId, status },
        { headers }
      )
      .then((response) => {
        auth.setMessage(response.data.message);
        fetchAllProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteProduct = async (id) => {
    console.log("delete product");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .delete(`http://localhost:5000/product/delete/${currentProductId}`, {
        headers,
      })
      .then((response) => {
        auth.setMessage(response.data.message);
        fetchAllProducts();
        setOpenDelete(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchAllProducts = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .get("http://localhost:5000/product/get", { headers })
      .then((respone) => {
        setProducts(respone.data);
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
    fetchAllProducts();
    fetchAllCategories();
  }, []);
  return (
    <React.Fragment>
      <Modal
        open={openDelete}
        onClose={(e) => setOpenDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ margin: "20px " }}>
            <Typography variant="h6" component="h2">
              Are you sure want to delete the product ?
            </Typography>
            <Button
              sx={{ margin: "0px 10px" }}
              onClick={handleDeleteProduct}
              variant="contained"
            >
              Yes
            </Button>
            <Button
              sx={{ margin: "0px 10px" }}
              onClick={(e) => setOpenDelete(false)}
              variant="outlined"
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ margin: "20px " }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isEditMode ? "Update" : "Add"} Product
            </Typography>

            <Grid container spacing={2} sx={{ margin: "20px 0px" }}>
              <Grid item xs={8} md={12}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  value={formData.price}
                  label="Price"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
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
                    value={formData.categoryId}
                    label="Category"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        categoryId: e.target.value,
                      }))
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ margin: "5px" }}>
            <Button
              sx={{ margin: "0px 10px" }}
              onClick={handleSaveProduct}
              variant="contained"
            >
              {isEditMode ? "Update" : "Add"}
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
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">{product.categoryName}</TableCell>
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
                    <IconButton onClick={(e) => handleEditProduct(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <Switch
                        onChange={(e) =>
                          handleUpdateStatus(
                            product.id,
                            !Boolean(Number(product.status))
                          )
                        }
                        checked={Boolean(Number(product.status))}
                      />
                    </IconButton>
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
