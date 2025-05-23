import {
  Alert,
  Box,
  Divider,
  CircularProgress,
  Drawer,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Store } from "../../Store";
import { setCategoryList, setProductList } from "../../actions";

interface CategoriesProps {
  categoryName: string;
  setcategoryName: (name: string) => void;
  itemsCount?: number;
}

const Categories: React.FC<CategoriesProps> = ({
  categoryName,
  setcategoryName,
  itemsCount
}) => {
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.CategoryList;

  useEffect(() => {
    if (!categories) {
      setCategoryList(dispatch);
    } else {
      setProductList(dispatch, categoryName);
    }
  }, [dispatch, categories, categoryName]);

  const categoryClickHandler = (name: string) => {
    setcategoryName(name);
    setProductList(dispatch, name);
  };

  const drawer = (
    <Box sx={itemsCount ? { pb: 25 } : undefined} className="text-center">
      <Box
        onClick={() => categoryClickHandler("")}
        sx={{
          width: "120px;",
          height: "120px;",
        }}
      >
        <img width={"100%"} src={"/images/logo.png"} alt={"sss"} />
      </Box>
      <Divider sx={{ borderWidth: "2px", borderColor: "#772C1E" }} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {categories && categories.map((category) => (
            <Box
              key={category._id}
              onClick={() => categoryClickHandler(category.name)}
              sx={{
                m: "10px 0",
                p: "8px 0",
                cursor: "pointer",
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#efefef",
                },
                backgroundColor:
                  categoryName === category.name ? "#772C1E" : "transparent",
                color: categoryName === category.name ? "#fff" : "#772C1E",
                fontWeight: "bold",
              }}
            >
              <Typography
                sx={{
                  p: "5px 0",
                  color: "inherit",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          ))}
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="nav" sx={{ width: { md: 140 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 140,
              border: "none",
              background: "transparent",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Categories;
