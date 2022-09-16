import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Footer from "../elements/Footer";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";
import {useEffect} from "react";

// Importing Configs
const {baseAPI} = require("../../configs/configs");

const theme = createTheme();

export default function Login() {

    const navigate = useNavigate();

    const [emailValid, setEmailValid] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
    const [passValid, setPassValid] = useState(false);
    const [passHelper, setPassHelper] = useState("");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home', {replace: true})
        }
    }, []);

    // toast settings
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
        severity: 'success',
        toastMsg: ''
    });
    const {vertical, horizontal, open, severity, toastMsg} = state;

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const validateContent = (emailV, passV, emailH, passH) => {
        setEmailValid(emailV)
        setPassValid(passV)
        setEmailHelper(emailH)
        setPassHelper(passH)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!data.email && !data.password) {
            validateContent(true, true, "Please enter email", "Please enter password")
        } else if (!data.email) {
            validateContent(true, false, "Please enter email", "")
        } else if (!data.password) {
            validateContent(false, true, "", "Please enter password")
        } else {
            validateContent(false, false, "", "")

            axios({
                method: 'post',
                url: baseAPI + '/auth',
                data: {
                    email: data.email,
                    password: data.password
                }
            })
                .then(function (response) {

                    const {data} = response
                    if (data.token) {
                        validateContent(false, false, "", "")

                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user_id', data.user._id);
                        localStorage.setItem('user_full_name', data.user.full_name);
                    }
                    setState({...state, open: true, severity: 'success', toastMsg: 'Logged in successfully.'});

                    setTimeout(() => {
                        navigate('/home', {replace: true})
                    }, 1000);

                })
                .catch(function (error) {
                    console.log(error.response.status);
                    validateContent(true, true, "Please enter valid email", "Please enter valid password");
                    setState({...state, open: true, severity: 'error', toastMsg: 'Incorrect username or password.'});
                });

        }
    };

    function clickSignup() {
        navigate("/sign", {replace: true})
    }

    const onChangeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                error={emailValid}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={data.email}
                                autoComplete="email"
                                autoFocus
                                onChange={onChangeHandler}
                                helperText={emailHelper}
                            />
                            <TextField
                                error={passValid}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={data.password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChangeHandler}
                                helperText={passHelper}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={() => handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => clickSignup()} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Button>
                                </Grid>

                                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}
                                          anchorOrigin={{vertical, horizontal}} key={vertical + horizontal}>
                                    <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                                        {toastMsg}
                                    </Alert>
                                </Snackbar>

                            </Grid>
                            <Footer sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}