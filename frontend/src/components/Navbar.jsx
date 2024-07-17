import * as React from "react";
import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Sidebar from "./Sidebar";
import Login from "./utils/Login.jsx";
import SignUp from "./utils/SignUp.jsx";
import ForgotPassword from "./ForgotPassword";
import { AuthContext } from "../context/Auth.jsx";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { Alert } from "@mui/material";
import Dashboard from "./pages/Dashboard.jsx";
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const auth = useContext(AuthContext);

  console.log(auth.isLoggedIn);
  const handleShowDialog = (value) => {
    setShowDialog(value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <StoreMallDirectoryIcon
              sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Cafe
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-between",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <MenuItem>
                  <Typography
                    textAlign={"center"}
                    onClick={(e) => handleShowDialog("login")}
                  >
                    Login
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign={"center"}
                    onClick={(e) => handleShowDialog("signup")}
                  >
                    SignUp
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign={"center"}
                    onClick={(e) => handleShowDialog("forgotPassword")}
                  >
                    Forgot Password?
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <StoreMallDirectoryIcon
              sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", sm: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Cafe
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={(e) => handleShowDialog("login")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
              <Button
                onClick={(e) => handleShowDialog("signup")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                SignUp
              </Button>
              <Button
                onClick={(e) => handleShowDialog("forgotPassword")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Forgot Password?
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {auth.message && (
        <Alert severity="success" onClose={() => auth.setMessage("")}>
          {auth.message}
        </Alert>
      )}
      {showDialog === "signup" && <SignUp setShowDialog={setShowDialog} />}
      {showDialog === "login" && <Login setShowDialog={setShowDialog} />}
      {showDialog === "forgotPassword" && (
        <ForgotPassword setShowDialog={setShowDialog} />
      )}
      {auth.isLoggedIn && <Dashboard open={open} setOpen={setOpen} />}
    </React.Fragment>
  );
}
export default Navbar;
