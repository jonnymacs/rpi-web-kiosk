import React, { useContext, useState } from "react";
import "./OHScreen.css";
import Categories from "./Categories";
import Products from "./Products";
import DialogSection from "./DialogSection";
import { Store } from "../../Store";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBack, Close, ShoppingBasket } from "@mui/icons-material";
import { clearOrder, removeFromOrder } from "../../actions";
import { useNavigate } from "react-router-dom";
import { OrderItem } from "../../types";

const OHScreen: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(Store);
  const [categoryName, setCategoryName] = useState<string>("");
  const { orderItems, totalPrice } = state.order;
  const navigate = useNavigate();
  const itemsCount = orderItems?.length || 0;

  const cancelOrRemoveFromOrder = (productId: string) => {
    removeFromOrder(dispatch, productId);
  };

  return (
    <Box sx={{ ml: "140px" }} className="bgColor">
      <Categories
        itemsCount={itemsCount}
        categoryName={categoryName}
        setcategoryName={setCategoryName}
      />
      <Products
        itemsCount={itemsCount} 
        categoryName={categoryName} 
        setOpen={setOpen} 
      />
      <DialogSection open={open} setOpen={setOpen} />

      {itemsCount ? (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: "10001",
            background: "#efefef",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            <Box
              sx={{
                borderRight: "3px solid #b74c3a",
                mr: 2,
                p: 1,
                pr: 3,
                position: "sticky",
                left: 0,
                background: "#efefef",
                zIndex: 1,
              }}
            >
              <p className="text-center">
                Mening <br />
                buyurtmalaringiz:{" "}
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "max-content",
                p: 1,
              }}
            >
              {orderItems && orderItems.map((item: OrderItem) => (
                <Card
                  key={item._id}
                  sx={{
                    maxWidth: 200,
                    minWidth: 200,
                    m: 1,
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={() => cancelOrRemoveFromOrder(item._id)}
                    sx={{
                      position: "absolute",
                      color: "white",
                      backgroundColor: "#b74c3a",
                      top: 0,
                      right: 0,
                      padding: "2px",
                      m: "5px",
                      "&:hover": {
                        backgroundColor: "#b74c3a",
                        opacity: 0.9,
                      },
                    }}
                    size="small"
                  >
                    <Close fontSize="small" />
                  </IconButton>
                  <CardContent sx={{ px: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 60, height: 60 }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        color: "#772C1E",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#b74c3a",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {item.quantity}
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          ml: 0.5,
                        }}
                      >
                        x {item.price} so'm
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              borderTop: "1px solid #b74c3a",
            }}
          >
            <Button
              onClick={() => clearOrder(dispatch)}
              sx={{
                backgroundColor: "transparent",
                color: "#b74c3a",
                fontFamily: "Poppins",
                fontWeight: "bold",
                minWidth: "150px",
                border: "1px solid #b74c3a",
                mx: 2,
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.9,
                },
              }}
            >
              Bekor qilish
            </Button>
            <Button
              onClick={() => navigate("/review")}
              startIcon={<ShoppingBasket />}
              sx={{
                backgroundColor: "#b74c3a",
                color: "#fff",
                fontFamily: "Poppins",
                fontWeight: "bold",
                minWidth: "150px",
                mx: 2,
                "&:hover": {
                  backgroundColor: "#b74c3a",
                  opacity: 0.9,
                },
              }}
            >
              {totalPrice} so'm | Ko'rib chiqish
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default OHScreen;
