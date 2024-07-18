import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.jsx";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
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
  const [categories, setCategories] = useState([]);
  const [isAddModal, setIsAddModal] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const auth = useContext(AuthContext);

  const handleModelOpen = () => {
    setOpen(true);
    setIsAddModal(true);
  }

  const handleEditCategoryClick = (id, name)=> {
    setFormData({id, name});
    setIsAddModal(false);
    setOpen(true);
  }
  const AddCategory = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    if (isAddModal) {
      await axios
        .post("http://localhost:5000/category/add", formData, { headers })
        .then((response) => {
          console.log(response);
          auth.setMessage(response.data.message);
          fetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .patch("http://localhost:5000/category/update", formData, { headers })
        .then((respone) => {
          console.log(respone);
          auth.setMessage(respone.data.message);
          fetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    handleClose();
  };
  const handleClose = () => {
    setFormData({ id: "", name: "" });
    setOpen(false);
  };
  async function fetchCategories() {
    const headers = {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .get("http://localhost:5000/category/get", { headers })
      .then((response) => {
        console.log(response);
        setFormData({ name: "" });
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);
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
              {isAddModal ? "Add " : "Update "} Category
            </Typography>
            <TextField
              sx={{ width: "100%", margin: "15px 0px" }}
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ margin: "5px" }}>
            <Button
              sx={{ margin: "0px 10px" }}
              onClick={AddCategory}
              variant="contained"
            >
              {isAddModal ? "Add " : "Update "}
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
            <h2>Manage Category</h2>
          </span>
          <Button
            name="add"
            variant="contained"
            onClick={handleModelOpen}
          >
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
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    id="edit"
                    onClick={(e) => handleEditCategoryClick(category.id, category.name)}
                  >
                    <EditIcon />
                  </IconButton>
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
