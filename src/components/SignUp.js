import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from "@material-ui/lab/Alert";
import Redirect from "react-router-dom/Redirect";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function IsBlank(value, setValue) {
  return value || setValue;
}

export default function SignIn() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [goToHome, setGoToHome] = useState(false);
  const [alertDetails, setAlertDetails] = useState({ hidden: true });

  function SignUp() {
    setDisabled(true);
    setAlertDetails({
        hidden: false,
        severity: "info",
        message: "Signing up...",
      });
    setTimeout(() => {
      if(password == confirmPassword) {
        const userParams = `user_name=${userName}&password=${window.btoa(password)}&first_name=${firstName}&last_name=${lastName}&delivery_address=${deliveryAddress}&billing_address=${billingAddress}`;
        fetch(`/user/register_user?${userParams}`, {method: "POST"})
        .then((res) => res.json())
        .then(
            (result) => {
                if(result.success) {
                    setAlertDetails({
                        hidden: false,
                        severity: "success",
                        message: "Sign Up success",
                      });
                      setGoToHome(true);
                } else {
                    setAlertDetails({
                        hidden: false,
                        severity: "error",
                        message: result.error_message,
                      });
                }
                setDisabled(false);
            },
            (error)  => {
                console.log(error);
            }
        )
      } else {
        setAlertDetails({
          hidden: false,
          severity: "error",
          message: "Password is not the same",
        });
      }
      setDisabled(false);
    }, 3000)
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user_name"
            label="User Name"
            name="user_name"
            autoFocus
            value={userName}
            onChange={(e) => {setUserName(e.target.value)}}
            disabled={disabled}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            disabled={disabled}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            disabled={disabled}
          />
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
                onClick={() => {setGoToHome(true)}}
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
            onClick={SignUp}
          >
            Sign Up
          </Button>
            </Grid>
            </Grid>
          
      </div>
      {!alertDetails.hidden && (
          <Alert severity={alertDetails.severity}>{alertDetails.message}</Alert>
        )}
        {goToHome && <Redirect to="/" />}
    </Container>
  );
}