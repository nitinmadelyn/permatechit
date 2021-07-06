import Config from "../../Config/Config";
import React, { useState, useEffect, useContext } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Superagent from "superagent";
import { UserContext } from "../../Context/UserContext";
import OrderItem from "./OrderItem";
import useStyles from "../../Assets/Styles";

export default function Order() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    Superagent.get(Config.apiBaseUrl + "order")
      .set("Content-Type", "application/json")
      .set("accept", "json")
      .set("Authorization", "Bearer " + userToken)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        setOrders(res.body.items);
      });
  }, []);

  return (
    <List className={classes.rootOrder}>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => <OrderItem order={order} />)
      ) : (
        <ListItem id="noOrder">
          <ListItemText key="noOrderText" primary="No Orders" />
        </ListItem>
      )}
    </List>
  );
}
