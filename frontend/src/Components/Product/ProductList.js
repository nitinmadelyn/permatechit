import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  styled,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProductItem from "./ProductItem";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function calculateTotalQuantity(products) {
  return products.reduce(
    (accumulator, currentValue, index, products) =>
      (accumulator += parseInt(products[index].quantity)),
    0
  );
}
export default function ProductList(props) {
  const { product } = props;
  const [expanded, setExpanded] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(calculateTotalQuantity(product));

  //setTotalQuantity(calculateTotalQuantity(product));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{marginBottom: "10px"}}>
      <CardHeader title={product[0].productName} />
      <CardActions disableSpacing>
        <Typography component="div">{`Qty: ${totalQuantity}`}</Typography>
        <ExpandMore
          className="expandMore"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {product.map((singleProduct) => (
            <ProductItem key={singleProduct.is} totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} product={singleProduct} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
