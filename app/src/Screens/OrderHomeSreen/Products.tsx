import {
  Alert,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { setProductList, setSelectedProduct } from "../../actions";
import { Store } from "../../Store";
import { Product } from "../../types";

interface ProductsProps {
  setOpen: (open: boolean) => void;
  categoryName: string;
  itemsCount?: number;
}

const Products: React.FC<ProductsProps> = ({ setOpen, categoryName, itemsCount }) => {
  const { state, dispatch } = useContext(Store);
  const { products, loading, error } = state.ProductList;

  useEffect(() => {
    setProductList(dispatch);
  }, [dispatch]);

  const ProductClickHandler = (id: string) => {
    if (products) {
      const selectedProduct = products.find((product) => product._id === id);
      if (selectedProduct) {
        setSelectedProduct(dispatch, selectedProduct);
        setOpen(true);
      }
    }
  };

  return (
    <Box sx={itemsCount ? {pb: 27, mt: 1} : {pb: 2, mt: 1}}>
      <Box>
        <Typography className="ProductsTitle">{categoryName === "" ? "Barchasi" : categoryName}</Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2
          }}
        >
          <div className="text-center">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
            <p style={{ fontFamily: "Poppins" }}>Mahsulotlar yuklanmoqda</p>
          </div>
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container columns={12} spacing={2}>
            {products && products.map((product) => (
              <Grid key={product._id} item xs={6} sm={4} md={3} lg={2}>
                <Box
                  onClick={() => ProductClickHandler(product._id)}
                  sx={{
                    backgroundColor: "#fff",
                    m: "10px 0",
                    p: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    height: "200px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      transition: "transform 0.3s ease",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "70%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#772C1E",
                        fontFamily: "Poppins",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                      variant="body2"
                      component="h2"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#772C1E",
                        fontFamily: "Poppins",
                        textAlign: "center",
                      }}
                      gutterBottom
                      variant="body2"
                      component="h2"
                    >
                      {product.price} so'm
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Products;
