import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const ProductCard = ({ product, addToCart }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={product.image}
      alt={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5">
        {product.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {product.description}
      </Typography>
      <Typography variant="h6">${product.price}</Typography>
      {/* <Button
        onClick={() => addToCart(product)}
        variant="contained"
        color="primary"
      >
        Add to Cart
      </Button> */}
    </CardContent>
  </Card>
);

export default ProductCard;
