// frontend/pages/HomePage.js

"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { Container, Grid, Button } from "@mui/material";
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
