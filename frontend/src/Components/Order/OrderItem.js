import Config from "../../Config/Config";
import React, { useState, useContext } from "react";
import {
  ListItem,
  Switch,
  ListItemText,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { UserContext } from "../../Context/UserContext";
import Superagent from "superagent";

export default function OrderItem(props) {
  const { order } = props;
  const [orderStatus, setOrderStatus] = useState(
    order.status === "Processing" ? false : true
  );
  const { userToken } = useContext(UserContext);

  function handleStatusChange() {
    Superagent.put(Config.apiBaseUrl + "order/" + order.id)
      .send({ status: orderStatus === false ? "Done" : "Processing" })
      .set("Content-Type", "application/json")
      .set("accept", "json")
      .set("Authorization", "Bearer " + userToken)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        setOrderStatus(!orderStatus);
      });
  }

  return (
    <>
      <ListItem id={`list-${order.id}`}>
        <ListItemText
          primary={`Order #`}
          secondary={
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Processing</Grid>
                <Grid item>
                  <Switch
                    checked={orderStatus}
                    onChange={handleStatusChange}
                    name="orderStatus"
                  />
                </Grid>
                <Grid item>Done</Grid>
              </Grid>
            </Typography>
          }
        />
      </ListItem>
      <Divider key={`divider-${order.id}`} component="li" />
    </>
  );
}
