import { Box, Card, CardContent, Grid } from "@mui/material";
import React, { useContext } from "react";
import Money from "../../assets/images/money.png";
import CreditCard from "../../assets/images/creditCard.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Store } from "../../Store";
import { setPayMethod } from "../../actions";
import { useNavigate } from "react-router-dom";

const PMScreen: React.FC = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const handlerChoose = (payMethod: string) => {
    setPayMethod(dispatch, payMethod);
    navigate("/order");
  };

  AOS.init();

  return (
    <div className="bgColor">
      <div className="title pt-3">
        <div className="centerStyle">
          <img width={"60%"}  style={{maxWidth: '200px'}} src={"/images/logo.png"} alt={"sss"} />
        </div>
        <p className="mb-5" data-aos="zoom-out-up">
          Qaysi usulda to'lov qilasiz?
        </p>
      </div>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Card
                onClick={() => handlerChoose("Naqd pul")}
                data-aos="fade-right"
                sx={{
                  textAlign: "center",
                  maxWidth: "200px",
                  minWidth: '60px',
                  height: "100%",
                  borderRadius: 8,
                  padding: {xs: 0, sm: 3},
                  border: '2px solid #772C1E'
                }}
              >
                <CardContent>
                  <img src={Money} style={{minWidth: '30px', maxWidth: '120px'}} width={"100%"} alt="Money" />
                  <p style={{color: '#772C1E'}}>Naqd pul to'lash</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                onClick={() => handlerChoose("Karta")}
                data-aos="fade-left"
                sx={{
                  textAlign: "center",
                  maxWidth: "200px",
                  minWidth: '60px',
                  height: "100%",
                  borderRadius: 8,
                  padding: {xs: 0, sm: 3},
                  border: '2px solid #772C1E'
                }}
              >
                <CardContent>
                  <img src={CreditCard} style={{minWidth: '30px', maxWidth: '120px'}} width={"100%"} alt="CreditCard" />
                  <p style={{color: '#772C1E'}}>Karta orqali to'lash</p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default PMScreen;
