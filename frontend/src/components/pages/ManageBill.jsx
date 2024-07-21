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
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
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

function ManageBill() {
  const [openDelete, setOpenDelete] = useState(false);
  const [currentBillId, setCurrenBillId] = useState();

  const [bills, setBills] = useState([]);
  const [viewBill, setViewBill] = useState(false);
  const [currentBill, setCurrentBill] = useState({});
  const auth = useContext(AuthContext);

  const handleViewBill = (bill) => {
    setViewBill(true);
    setCurrentBill(bill);
  };
  const handleClose = () => {
    setViewBill(false);
  };
  const handleDeleteBill = (billId) => {
    setOpenDelete(true);
    setCurrenBillId(billId);
  };
  const handleDownloadBill = async (bill) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };

    try {
      const pdfResponse = await axios.post(
        "http://localhost:5000/bill/getPdf",
        { ...bill, productDetails: bill.product_details },
        { headers, responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([pdfResponse.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error in handleGetBill:", error);
    }
  };

  const handleConfirmDeleteBill = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .delete(`http://localhost:5000/bill/deleteBill/${currentBillId}`, {
        headers,
      })
      .then((response) => {
        auth.setMessage(response.data.message);
        fetchAllBills();
        setOpenDelete(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchAllBills = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .get("http://localhost:5000/bill/getBills", { headers })
      .then((respone) => {
        setBills(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllBills();
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
              onClick={handleConfirmDeleteBill}
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
        open={viewBill}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ margin: "20px " }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              View Bill
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name : {currentBill.name}</TableCell>
                    <TableCell>Email : {currentBill.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Cotanct Number : {currentBill.contactNumber}
                    </TableCell>
                    <TableCell>
                      Payment Method : {currentBill.paymentMethod}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>

            <Typography variant="h5">Product Details :</Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentBill.product_details?.length !== 0 &&
                    currentBill.product_details?.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {" "}
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.total}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <h2>Total Amount : {currentBill.total}</h2>
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
            <h2>View Bill</h2>
          </span>
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
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow
                key={bill.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {bill.name}
                </TableCell>
                <TableCell align="center">{bill.email}</TableCell>
                <TableCell align="center">{bill.contactNumber}</TableCell>
                <TableCell align="center">{bill.paymentMethod}</TableCell>
                <TableCell align="center">{bill.total}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={(e) => handleViewBill(bill)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDownloadBill(bill)}>
                      <InsertDriveFileIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDeleteBill(bill.id)}>
                      <DeleteIcon />
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

export default ManageBill;
