import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { AuthContext } from "../../context/Auth";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const auth = useContext(AuthContext);

  const handleUpdateStatus = async (userId, status) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .patch(
        "http://localhost:5000/user/update",
        { id: userId, status },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        auth.setMessage(response.data.message);
        fetchAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllUsers = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userId}`,
    };
    await axios
      .get("http://localhost:5000/user/get", { headers })
      .then((respone) => {
        setUsers(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <React.Fragment>
      <Card sx={{ margin: "10px 0px" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            <h2>Manage Users</h2>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.contactNumber}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <IconButton>
                      <Switch
                        onChange={(e) =>
                          handleUpdateStatus(
                            user.id,
                            !Boolean(Number(user.status))
                          )
                        }
                        checked={Boolean(Number(user.status))}
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

export default ManageUsers;
