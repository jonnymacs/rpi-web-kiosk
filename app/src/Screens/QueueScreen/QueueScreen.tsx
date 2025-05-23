import React, { useContext, useEffect } from "react";
import { setQueueList } from "../../actions";
import { Store } from "../../Store";
import { Alert, CircularProgress, Divider, Grid, List, ListItem, Paper } from "@mui/material";
import { Order } from "../../types";

interface QueueData {
  inProgressOrders: Order[];
  servingOrders: Order[];
}

const QueueScreen: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const { queue, loading, error } = state.queueList;

  useEffect(() => {
    setQueueList(dispatch);
  }, [dispatch]);

  // Only cast if queue exists and has the right shape
  const hasQueueData = queue && 
    typeof queue === 'object' && 
    'inProgressOrders' in queue && 
    'servingOrders' in queue;

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : hasQueueData ? (
        <Grid container spacing={2}>
          <Grid item md={6} xs={6}>
            <Paper sx={{textAlign: 'center'}}>
              <h1 style={{background: 'red', color: 'white', padding: '10px' }}>Tayyorlanmoqda</h1>
              <List>
                {(queue as QueueData).inProgressOrders.map((order: Order) => (
                  <React.Fragment key={order.number}>
                    <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                      <h1>{order.number}</h1>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item md={6} xs={6}>
            <Paper sx={{textAlign: 'center'}}>
              <h1 style={{background: 'green', color: 'white', padding: '10px' }}>Tayyor </h1>
              <List>
                {(queue as QueueData).servingOrders.map((order: Order) => (
                  <React.Fragment key={order.number}>
                    <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                      <h1>{order.number}</h1>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="info">No queue data available</Alert>
      )}
    </div>
  );
};

export default QueueScreen;
