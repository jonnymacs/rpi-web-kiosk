import { Box, Card, CardContent, Grid } from "@mui/material";
import React, { useContext } from "react";
import Image1 from "../../assets/images/ChScreen1.png";
import Image2 from "../../assets/images/ChScreen2.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Store } from "../../Store";
import { setOrderType } from "../../actions";
import { useNavigate } from "react-router-dom";

const ChScreen: React.FC = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const handlerChoose = (orderType: string) => {
    setOrderType(dispatch, orderType);
    navigate("/paymethod");
  };

  AOS.init();

  return (
    <div className="bgColor">
      <div className="title pt-3">
        <div className="centerStyle">
          <img width={"60%"} style={{maxWidth: '200px'}} src={"/images/logo.png"} alt={"sss"} />
        </div>
        <p className="mb-5" data-aos="zoom-out-up">
          Bugun qayerda ovqatlanasiz?
        </p>
      </div>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Card
                onClick={() => handlerChoose("Ichkarida ovqatlanish")}
                data-aos="fade-right"
                sx={{
                  textAlign: "center",
                  maxWidth: "200px",
                  minWidth: '60px',
                  borderRadius: 8,
                  padding: {xs: 0, sm: 3},
                  border: '2px solid #772C1E'
                }}
              >
                <CardContent>
                  <img src={Image1} width={"100%"} style={{minWidth: '30px', maxWidth: '120px'}} alt="ChScreen1" />
                    <p style={{color: '#772C1E', marginTop: '5px'}}>Ichkarida ovqatlanish</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                onClick={() => handlerChoose("Olib ketish")}
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
                  <img src={Image2} width={"100%"} style={{minWidth: '30px', maxWidth: '120px'}} alt="ChScreen1" />
                  <p style={{color: '#772C1E', marginTop: '5px'}}>O'zi bilan olib ketish</p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ChScreen;
