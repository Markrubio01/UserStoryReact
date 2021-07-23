import React, { useEffect, useState } from "react";
import {Button, CssBaseline, TextField, Grid, Typography, Container} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { ArrowBack, Save } from "@material-ui/icons";
import Redirect from "react-router-dom/Redirect";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function IsBlank(value, setValue) {
  return value || setValue;
}

export default function Form(params) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hideAlert, setHideAlert] = useState(true);
  const [backToHome, setBackToHome] = useState(false);
  const [alertResult, setAlertResult] = useState({
    severity: "success",
    message: "User updated successfully",
  });

  function updateUser(updateParams) {
    fetch(
      `/user/update_user_contact_info?id=${params.Id}&${updateParams}`,
      { method: "POST"
     // , headers: {"Authorization": window.btoa(process.env.REACT_APP_API_TOKEN)} 
    }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            getInitialData();
            setAlertResult({
              severity: "success",
              message: "User updated successfully",
            });
          } else {
            setAlertResult({
              severity: "error",
              message: result.error_message,
            });
          }
        },
        (error) => {
          setAlertResult({ severity: "error", message: error });
        }
      );
  }

  function createUser(createParams) {
    fetch(
      `/user/create_user?${createParams}`,
      { method: "POST", headers: {"Authorization": window.btoa(process.env.REACT_APP_API_TOKEN)} }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setAlertResult({
              severity: "success",
              message: "User created successfully",
            });
            setBackToHome(true);
          } else {
            setAlertResult({
              severity: "error",
              message: result.error_message,
            });
          }
        },
        (error) => {
          setAlertResult({ severity: "error", message: error });
        }
      );
  }
  function SaveUser(e) {
    setHideAlert(false);
    const message = (params.Id > 0) ? "User is updating...." : "Creating user...."
    setAlertResult({ severity: "info", message: message});
    setDisabled(true);
    setTimeout(() => {
      const userParams = `first_name=${firstName}&last_name=${lastName}&delivery_address=${deliveryAddress}&billing_address=${billingAddress}`;
      if(params.Id > 0) {
        updateUser(userParams);
      } else {
        createUser(userParams);
      }
      setDisabled(false);
    }, 3000);
  }

  function getInitialData() {
    fetch(`/user/get_user_data?id=${params.Id}`, { method: "GET", headers: {"Authorization": window.btoa(process.env.REACT_APP_API_TOKEN)} })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setFirstName(result.data.first_name);
            setLastName(result.data.last_name);
            setDeliveryAddress(result.data.delivery_address);
            setBillingAddress(result.data.billing_address);
            setIsLoaded(true);
          } else {
            setError(result.error_message);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  useEffect(() => {
    if(params.Id > 0) {
      setTimeout(() => {
        getInitialData();
      }, 3000);
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  } else if (!isLoaded) {
    return <Alert severity="info">Loading....</Alert>;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{"marginBottom": "15px"}}>
            User
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                value={IsBlank(firstName, "")}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setHideAlert(true);
                }}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={IsBlank(lastName, "")}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setHideAlert(true);
                }}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="delivery_address"
                variant="outlined"
                required
                fullWidth
                id="delivery_address"
                label="Delivery Address"
                value={IsBlank(deliveryAddress, "")}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                  setHideAlert(true);
                }}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="billing_address"
                variant="outlined"
                required
                fullWidth
                id="billing_address"
                label="Billing Address"
                value={IsBlank(billingAddress, "")}
                onChange={(e) => {
                  setBillingAddress(e.target.value);
                  setHideAlert(true);
                }}
                disabled={disabled}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.submit}
                startIcon={<ArrowBack />}
                disabled={disabled}
                onClick={() => {setBackToHome(true)}}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={SaveUser}
                startIcon={<Save />}
                disabled={disabled}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          {!hideAlert && (
            <Alert severity={alertResult.severity}>{alertResult.message}</Alert>
          )}
          {backToHome && <Redirect to="/" />}
        </div>
      </Container>
    );
  }
}
