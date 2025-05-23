import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Store } from "../../Store";
import axios from "axios";
import { setOrderList } from "../../actions";
import { Cancel, CheckCircle, LocalShipping } from "@mui/icons-material";
import { Order } from "../../types";

const AdminScreen: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const { orders, loading, error } = state.orderList;

  const setOrderStateHandler = async (order: Order, action: string) => {
    try {
      await axios.put("https://self-order-kiosk-back.vercel.app/api/orders/" + order._id, {
        action: action,
      });
      setOrderList(dispatch);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    setOrderList(dispatch);
  }, [dispatch]);

  return (
    <div>
      <div className="title pt-3">
        <div className="centerStyle">
          <img width={"30%"} src={"/images/logo.png"} alt={"sss"} />
        </div>
        <p className="mb-2 mx-3">Bizning buyurtmalar:</p>
      </div>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#772C1E" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Raqami
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Vaqti
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    To'lov turi
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Ovqatlanish joyi
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Holati
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Harakatlar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order: Order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {order.number}
                      </TableCell>
                      <TableCell>
                        {order.createdAt?.substring(0, 10)}
                      </TableCell>
                      <TableCell>{order.payMethod}</TableCell>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell>
                        {order.inProgress
                          ? "Jarayonda"
                          : order.isReady
                          ? "Tayyor"
                          : order.isDelivered
                          ? "Yetkazildi"
                          : "Bekor qilingan"}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <IconButton
                            onClick={() =>
                              setOrderStateHandler(order, "ready")
                            }
                            size="small"
                            sx={{
                              color: "#33923f",
                              backgroundColor: "rgba(51, 146, 63, 0.2)",
                              border: "1px solid #33923f",
                              ml: 1,
                            }}
                          >
                            <CheckCircle />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setOrderStateHandler(order, "deliver")
                            }
                            size="small"
                            sx={{
                              color: "#1565c0",
                              backgroundColor: "rgba(21, 101, 192, 0.2)",
                              border: "1px solid #1565c0",
                              ml: 1,
                            }}
                          >
                            <LocalShipping />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setOrderStateHandler(order, "cancel")
                            }
                            size="small"
                            sx={{
                              color: "#c92a2a",
                              backgroundColor: "rgba(201, 42, 42, 0.2)",
                              border: "1px solid #c92a2a",
                              ml: 1,
                            }}
                          >
                            <Cancel />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default AdminScreen;
