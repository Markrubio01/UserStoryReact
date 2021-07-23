import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from "@material-ui/lab/Alert";

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

export default function SignIn() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [alertDetails, setAlertDetails] = useState({ hidden: true });

  function LogIn() {
    setDisabled(true);
    setAlertDetails({
        hidden: false,
        severity: "info",
        message: "Log in...",
      });
    setTimeout(() => {
        fetch(`/user/login_user?user_name=${userName}&password=${password}`)
        .then((res) => res.json())
        .then(
            (result) => {
                if(result.success) {
                    setAlertDetails({
                        hidden: false,
                        severity: "success",
                        message: "Log in success",
                      });
                    
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
          Sign in
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            disabled={disabled}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={LogIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
      {!alertDetails.hidden && (
          <Alert severity={alertDetails.severity}>{alertDetails.message}</Alert>
        )}
    </Container>
  );
}