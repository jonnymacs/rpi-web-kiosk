import React, { useContext, useEffect } from "react";
import { Store } from "../../Store";
import { createOrder } from "../../actions";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const CScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, order: newOrder } = state.orderCreate;

  useEffect(() => {
    if (order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  }, [order, dispatch]);

  return (
    <div>
      <div className="title pt-3">
        <div className="centerStyle">
          <img
            width={"30%"}
            style={{ maxWidth: "200px" }}
            src={"/images/logo.png"}
            alt={"sss"}
          />
        </div>
        <p className="mb-2 mx-3">Biz sizning buyurtmangizni tayyorlamoqdamiz</p>
      </div>
      <Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <div className="text-center">
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : newOrder ? (
          <>
            <Typography
              sx={{ textAlign: "center", textTransform: "uppercase" }}
              gutterBottom
              variant="h6"
              component="h6"
            >
              Iltimos biroz kuting!
            </Typography>
            <Box sx={{ textAlign: "center", position: "relative" }}>
              <img
                src={"/images/receiptPaper.png"}
                alt="receiptPaper"
                style={{ maxWidth: "300px" }}
                width={"50%"}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Typography
                  sx={{ textAlign: "center", textTransform: "uppercase", fontSize: {xs: '8px', md: '12px'} }}
                  gutterBottom
                  component="p"
                >
                  Sizning buyurtma raqamingiz:
                </Typography>
                <Typography component="p" sx={{ fontSize: {xs: '100px', md: '200px'}, fontWeight: "bolder" }}>
                  {newOrder.number}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mx: {xs: 3, md: 15}, mt: 5, textAlign: "center" }}>
              <Button
                onClick={() => navigate(`/`)}
                startIcon={<ArrowBack />}
                variant="contained"
                sx={{
                  backgroundColor: "#772C1E",
                  color: "#fff",
                  px: 3,
                  py: 1,
                  my: 2,
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#772C1E",
                    opacity: 0.9,
                  },
                }}
              >
                Asosiy sahifaga
              </Button>
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
};

export default CScreen;
