import {
  AddCircleOutline,
  ArrowBack,
  AssignmentTurnedIn,
  EditNote,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Store } from "../../Store";
import { addToOrder, removeFromOrder } from "../../actions";
import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import { OrderItem, Product } from "../../types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RScreen: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(Store);
  const { orderItems, totalPrice, orderType, payMethod } = state.order;
  const itemsCount = orderItems?.length || 0;
  const [product, setProduct] = useState<Product | OrderItem>({} as Product);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product._id);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        open={open}
        sx={{
          zIndex: 100000,
          "& .MuiDialog-paper": {
            borderRadius: "20px",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            background: "#772C1E",
          }}
        >
          <Grid
            container
            sx={{
              height: "100%",
            }}
          >
            <Grid
              item
              xs={5}
              sx={{
                background: "#772C1E",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  style={{ maxWidth: "100%", width: "200px" }}
                  src={product.image}
                  alt={product.name}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={7}
              sx={{
                backgroundColor: "#fff",
                p: 2,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {product.price} so'm
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Miqdorini o'zgartirish:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <RemoveCircleOutline sx={{ color: "#772C1E" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      mx: 1,
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <AddCircleOutline sx={{ color: "#772C1E" }} />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <Button
                  onClick={cancelOrRemoveFromOrder}
                  sx={{
                    backgroundColor: "#772C1E",
                    color: "#fff",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#772C1E",
                      opacity: 0.9,
                    },
                  }}
                >
                  O'chirish
                </Button>
                <Button
                  onClick={addToOrderHandler}
                  sx={{
                    backgroundColor: "#772C1E",
                    color: "#fff",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#772C1E",
                      opacity: 0.9,
                    },
                  }}
                >
                  O'zgartirish
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
        <div className="title pt-3">
          <div className="centerStyle">
            <img
              width={"30%"}
              style={{ maxWidth: "200px" }}
              src={"/images/logo.png"}
              alt={"sss"}
            />
          </div>
          <p className="mb-2 mx-3">Buyurtmani ko'rib chiqish</p>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={8}>
            <Card
              sx={{
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <EditNote
                  sx={{ color: "#772C1E", width: "32px", height: "32px" }}
                />
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "16px",
                    ml: 1,
                  }}
                >
                  Buyurtma tafsilotlari
                </Typography>
              </Box>
              {orderItems && orderItems.map((item) => (
                <Box key={item._id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "#772C1E",
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#772C1E",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                          }}
                        >
                          {item.quantity} x {item.price} so'm
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          color: "#772C1E",
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          mr: 2,
                        }}
                      >
                        {item.quantity * item.price} so'm
                      </Typography>
                      <IconButton
                        onClick={() => {
                          setProduct(item);
                          setQuantity(item.quantity);
                          setOpen(true);
                        }}
                        size="small"
                        sx={{
                          color: "#772C1E",
                          backgroundColor: "rgba(119, 44, 30, 0.1)",
                        }}
                      >
                        <EditNote />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  p: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Jami
                </Typography>
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  {totalPrice} so'm
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Card
              sx={{
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <AssignmentTurnedIn
                  sx={{ color: "#772C1E", width: "32px", height: "32px" }}
                />
                <Typography
                  sx={{
                    color: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "16px",
                    ml: 1,
                  }}
                >
                  Buyurtma ma'lumotlari
                </Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                    }}
                  >
                    Ovqatlanish joyi:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                  >
                    {orderType}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                    }}
                  >
                    To'lov turi:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                  >
                    {payMethod}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                    }}
                  >
                    Jami summa:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#772C1E",
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                  >
                    {totalPrice} so'm
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  onClick={() => navigate("/order")}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  sx={{
                    color: "#772C1E",
                    borderColor: "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#772C1E",
                      backgroundColor: "rgba(119, 44, 30, 0.1)",
                    },
                  }}
                >
                  Orqaga
                </Button>
                <Button
                  onClick={() => navigate("/complete")}
                  variant="contained"
                  sx={{
                    backgroundColor: "#772C1E",
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#772C1E",
                      opacity: 0.9,
                    },
                  }}
                >
                  Buyurtmani tasdiqlash
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RScreen;
