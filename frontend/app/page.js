"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { Container, Grid, Pagination, Typography } from "@mui/material"; // Importing Typography for better titles
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, totalPages } = await getProducts(currentPage);
      setProducts(products);
      setTotalPages(totalPages);
    };
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" className="my-8">
      {" "}
      <Typography
        variant="h4"
        component="h1"
        className="text-center mb-6 mt-[70px]"
      >
        Product Listings
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
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
    </Container>
  );
}
