import { Button, Card, CardActionArea, CardContent, CardHeader } from "@mui/material";
import React from "react";

function Dashboard({text, count}) {
  return (
    <Card sx={{minWidth : "300px", display : "inline-block", margin : "10px 10px" }} >
      <CardHeader title={ `Total ${text}`} ></CardHeader>
      <CardContent>
        <h1>{count}</h1>
      </CardContent>
      <CardActionArea>
        <Button>View {text}</Button>
      </CardActionArea>
    </Card>
  );
}

export default Dashboard;
