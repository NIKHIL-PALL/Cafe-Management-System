import { Button, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";

function DashboardCard({text, count}) {
  return (
    <Card sx={{minWidth : "300px", display : "inline-block", margin : "10px 10px" }} >
      <CardHeader title={ `Total ${text}`} ></CardHeader>
      <CardContent>
        <h1>{count}</h1>
        <Button>View {text}</Button>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
