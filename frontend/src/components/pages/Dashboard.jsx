import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Card, CardContent, CardHeader } from "@mui/material";
import Category from "./Category";
import ManageProduct from "./ManageProduct";
import ManageOrder from "./ManageOrder";
import DashboardCard from "./DashboardCard";
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard({open, setOpen}) {
    const [itemSelected, setItemSelected] = React.useState(0);

  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton selected  ={itemSelected === 0} onClick={(e) => setItemSelected(0)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem >
            <ListItemButton  selected  ={itemSelected === 1} onClick={(e) => setItemSelected(1)}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Category"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemButton  selected  ={itemSelected === 2} onClick={(e) => setItemSelected(2)}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Product"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemButton  selected  ={itemSelected === 3} onClick={(e) => setItemSelected(3)}>
              <ListItemIcon>
                <DeliveryDiningIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Order"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemButton  selected  ={itemSelected === 4} onClick={(e) => setItemSelected(4)}>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="View Bill"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemButton  selected  ={itemSelected === 5} onClick={(e) => setItemSelected(5)}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        { itemSelected === 0 && <Card>
          <CardHeader title="Dashboard"></CardHeader>
          <Divider></Divider>
          <CardContent  sx={{display : "flex", justifyContent : "space-around", flexWrap : "wrap"}}>
            {[{name : "Category" , count : 5}, {name : "Product", count : 7}, {name : "Bill", count : 9}].map((item, index) => (
                <DashboardCard key={index} text={item.name} count={item.count} />
            )) }
            
          </CardContent>
        </Card>}
        {itemSelected=== 1 && 
        <Category/>
        }
        {itemSelected=== 2 && 
        <ManageProduct/>
        }
        {itemSelected=== 3 && 
        <ManageOrder/>
        }

      </Main>
    </Box>
  );
}
