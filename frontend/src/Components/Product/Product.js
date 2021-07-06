import Config from "../../Config/Config";
import React, { useState, useEffect, useContext } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import Superagent from "superagent";
import { UserContext } from "../../Context/UserContext";
import ProductList from "./ProductList";

export default function Product() {
  const [products, setProducts] = useState([]);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    Superagent.get(Config.apiBaseUrl + "product")
      .set("Content-Type", "application/json")
      .set("accept", "json")
      .set("Authorization", "Bearer " + userToken)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }

        const result = res.body.items.reduce(function (r, a) {
          r[a.productId] = r[a.productId] || [];
          r[a.productId].push(a);
          return r;
        }, Object.create(null));

        setProducts(Object.values(result));
      });
  }, []);

  return (
    <>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product, i) => <ProductList product={product} />)
      ) : (
        <ListItem id="noProduct">
          <ListItemText primary="No Products" />
        </ListItem>
      )}
    </>
  );
}
