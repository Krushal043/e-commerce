import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const ProductCard = ({ product, addToCart }) => (
  <Card className="w-72 h-full rounded-lg shadow-lg overflow-hidden m-4 transition-transform transform hover:scale-105 flex flex-col">
    <CardMedia
      component="img"
      image={product.image}
      alt={product.name}
      className="object-cover w-full h-[230px]"
    />
    <CardContent className="flex-1 p-4 flex flex-col justify-between">
      {" "}
      <div>
        <Typography
          variant="h5"
          component="div"
          className="text-lg font-semibold mb-2"
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-gray-600 text-sm mb-2"
        >
          {product.description}
        </Typography>
      </div>
      <Typography variant="h6" className="text-xl font-bold mb-4">
        {" "}
        ₹{product.price}
      </Typography>
      <Button
        onClick={() => addToCart(product)}
        variant="contained"
        color="primary"
        className="mt-4 w-full hover:bg-blue-600 transition"
      >
        Add to Cart
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
