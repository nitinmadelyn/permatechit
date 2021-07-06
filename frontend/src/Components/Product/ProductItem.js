import Config from "../../Config/Config";
import React, { useState, useContext, useEffect } from "react";
import {
  ListItem,
  Switch,
  ListItemText,
  Grid,
  Typography,
  Divider,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { UserContext } from "../../Context/UserContext";
import Superagent from "superagent";
import useStyles from "../../Assets/Styles";

export default function ProductItem(props) {
  const { product } = props;
  const classes = useStyles();
  const [quantity, setQuantity] = useState(product.quantity);
  const [productStatus, setProductStatus] = useState(
    product.status === "Processing" ? false : true
  );
  const { userToken } = useContext(UserContext);

  function handleStatusChange() {
    Superagent.put(Config.apiBaseUrl + "product/" + product.id)
      .send({ status: productStatus === false ? "Done" : "Processing" })
      .set("Content-Type", "application/json")
      .set("accept", "json")
      .set("Authorization", "Bearer " + userToken)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        setProductStatus(!productStatus);
      });
  }

  function updateQuantity(qty) {
    Superagent.put(Config.apiBaseUrl + "product/" + product.id)
      .send({ quantity: qty })
      .set("Content-Type", "application/json")
      .set("accept", "json")
      .set("Authorization", "Bearer " + userToken)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
      });
  }

  //useEffect(() => {
  //  updateQuantity();
  //}, [quantity])

  function handleIncrement() {
    setQuantity(quantity + 1);
    props.setTotalQuantity(props.totalQuantity + 1);
    updateQuantity(quantity + 1)
  }

  function handleDecrement() {
    setQuantity(quantity - 1);
    props.setTotalQuantity(props.totalQuantity - 1);
    updateQuantity(quantity - 1)
  }

  return (
    <>
      <Divider component="li" className={classes.listStyleNone} />
      <ListItem id={product.id}>
        <ListItemText
          primary="Qty: "
          secondary={
            <ListItemText
              primary={
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button onClick={handleIncrement}>+</Button>
                  <Button disabled>{quantity}</Button>
                  {quantity <= 0 ? (
                    <Button disabled>-</Button>
                  ) : (
                    <Button onClick={handleDecrement}>-</Button>
                  )}
                </ButtonGroup>
              }
              secondary={
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Processing</Grid>
                    <Grid item>
                      <Switch
                        checked={productStatus}
                        onChange={handleStatusChange}
                        name="productStatus"
                      />
                    </Grid>
                    <Grid item>Done</Grid>
                  </Grid>
                </Typography>
              }
            />
          }
        />
      </ListItem>
    </>
  );
}
