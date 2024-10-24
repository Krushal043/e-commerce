"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import {
  Container,
  Grid,
  Pagination,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayProduct, setDisplayProduct] = useState();
  const { addToCart } = useCart();

  const categories = ["all", "laptop", "smartphone", "smartwatch"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { products, totalPages } = await getProducts(currentPage);
        setProducts(products);
        setDisplayProduct(products);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered =
        selectedCategory === "all"
          ? products
          : products.filter((product) => product.category === selectedCategory);

      setDisplayProduct(filtered);
    };
    filterProducts();
  }, [selectedCategory, products]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="lg" className="my-8">
      {loading ? (
        <div className="flex justify-center products">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h1"
            className="text-center mb-6 products"
          >
            Product Listings
          </Typography>

          <Box className="gap-2" display="flex" justifyContent="center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => handleCategoryChange(category)}
                className="mx-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </Box>
          <Grid container spacing={3}>
            {displayProduct.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} addToCart={addToCart} />
              </Grid>
            ))}
          </Grid>
          <div className="flex justify-center mt-10">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              size="large"
            />
          </div>
        </>
      )}
    </Container>
  );
}
