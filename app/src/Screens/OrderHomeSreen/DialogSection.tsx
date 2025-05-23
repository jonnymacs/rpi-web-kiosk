import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Store } from "../../Store";
import {
  AddCircle,
  AddCircleOutline,
  RemoveCircle,
  RemoveCircleOutline,
  ShoppingBasket,
} from "@mui/icons-material";
import { addToOrder, removeFromOrder } from "../../actions";
import Swal from "sweetalert2";
import { TransitionProps } from "@mui/material/transitions";

// Images
import Suzma from "../../assets/images/Suzma.png";
import Chili from "../../assets/images/Chili.png";
import Pishloq from "../../assets/images/Pishloq.png";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogSectionProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

interface ExtraOption {
  [key: string]: boolean;
}

const DialogSection: React.FC<DialogSectionProps> = ({ setOpen, open }) => {
  const { state, dispatch } = useContext(Store);
  const { selected } = state.SelectedProduct;
  const [quantity, setQuantity] = useState<number>(1);
  const [qoshimchalar, setQoshimchalar] = useState<ExtraOption>({});
  
  const AddToOrderHandler = () => {
    if ('_id' in selected && 'name' in selected && 'price' in selected) {
      addToOrder(dispatch, { 
        _id: selected._id, 
        name: selected.name, 
        price: selected.price,
        quantity,
        qoshimchalar,
        image: selected.image
      });
      setOpen(false);
      setQuantity(1);
      Swal.fire({
        icon: "success",
        title: `Yaxshi tanlov`,
        text: `Taomingiz savatchaga qo'shildi`,
        timer: 2000,
        timerProgressBar: true,
        confirmButtonText: "Yaxshi!",
      });
    }
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, selected._id);
    setOpen(false);
  };
  
  return (
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#772C1E",
            width: "100%",
            minHeight: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            {selected?.name}
          </Typography>
        </Box>

        <Grid container>
          <Grid item xs={5} display="flex" justifyContent="center">
            <Box className="dialogImageStyle">
              <img
                src={selected?.image}
                alt={selected?.name}
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#772C1E",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Tarkibi:
              </Typography>
              <Typography
                sx={{
                  color: "#772C1E",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  flex: 1,
                }}
              >
                {selected?.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <RemoveCircle sx={{ color: "#772C1E" }} />
                </IconButton>
                <Typography sx={{ mx: 2, fontFamily: "Poppins" }}>
                  {quantity}
                </Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <AddCircle sx={{ color: "#772C1E" }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ my: 1 }}>
            <Typography
              sx={{
                color: "#772C1E",
                fontFamily: "Poppins",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Qo'shimchalar:
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                onClick={() =>
                  setQoshimchalar({
                    ...qoshimchalar,
                    suzma: !qoshimchalar.suzma,
                  })
                }
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  backgroundColor: qoshimchalar.suzma
                    ? "#772C1E"
                    : "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  border: "1px solid #772C1E",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                  {qoshimchalar.suzma ? (
                    <RemoveCircle sx={{ color: "#fff" }} />
                  ) : (
                    <AddCircleOutline sx={{ color: "#772C1E" }} />
                  )}
                </Box>
                <img src={Suzma} alt="suzma" style={{ width: "60px" }} />
                <Typography
                  sx={{
                    color: qoshimchalar.suzma ? "#fff" : "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  Suzma sous
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                onClick={() =>
                  setQoshimchalar({
                    ...qoshimchalar,
                    chili: !qoshimchalar.chili,
                  })
                }
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  backgroundColor: qoshimchalar.chili
                    ? "#772C1E"
                    : "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  border: "1px solid #772C1E",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                  {qoshimchalar.chili ? (
                    <RemoveCircle sx={{ color: "#fff" }} />
                  ) : (
                    <AddCircleOutline sx={{ color: "#772C1E" }} />
                  )}
                </Box>
                <img src={Chili} alt="Chili" style={{ width: "60px" }} />
                <Typography
                  sx={{
                    color: qoshimchalar.chili ? "#fff" : "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  Chili sous
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                onClick={() =>
                  setQoshimchalar({
                    ...qoshimchalar,
                    pishloq: !qoshimchalar.pishloq,
                  })
                }
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  backgroundColor: qoshimchalar.pishloq
                    ? "#772C1E"
                    : "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  border: "1px solid #772C1E",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                  {qoshimchalar.pishloq ? (
                    <RemoveCircle sx={{ color: "#fff" }} />
                  ) : (
                    <AddCircleOutline sx={{ color: "#772C1E" }} />
                  )}
                </Box>
                <img src={Pishloq} alt="Pishloq" style={{ width: "60px" }} />
                <Typography
                  sx={{
                    color: qoshimchalar.pishloq ? "#fff" : "#772C1E",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  Pishloq sous
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 30px",
          }}
        >
          <Button
            onClick={cancelOrRemoveFromOrder}
            sx={{
              backgroundColor: "#772C1E",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: "bold",
              px: 3,
              "&:hover": {
                backgroundColor: "#772C1E",
                opacity: 0.9,
              },
            }}
          >
            Bekor qilish
          </Button>
          <Button
            onClick={AddToOrderHandler}
            startIcon={<ShoppingBasket />}
            sx={{
              backgroundColor: "#772C1E",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: "bold",
              px: 3,
              "&:hover": {
                backgroundColor: "#772C1E",
                opacity: 0.9,
              },
            }}
          >
            Qo'shish
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSection;
