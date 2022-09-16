import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Footer from "../elements/Footer";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {baseAPI} from "../../configs/configs";
import {Alert, Snackbar} from "@mui/material";
import {useEffect} from "@types/react";

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // Toast configs
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
        severity: 'success',
        toastMsg: ''
    });
    const {vertical, horizontal, open, severity, toastMsg} = state;
    const handleCloseSnack = () => {
        setState({...state, open: false});
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home', {replace: true})
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: baseAPI + '/user',
            data: {
                full_name: data.firstName + ' ' + data.lastName,
                email: data.email,
                password: data.password
            }
        })
            .then(function (response) {
                const {data} = response;
                if (data) {
                    setState({...state, open: true, severity: 'success', toastMsg: 'User added successfully'});

                    setTimeout(() => {
                        navigate('/', {replace: true})
                    }, 2000);
                } else {
                    setState({...state, open: true, severity: 'warning', toastMsg: 'Something went wrong!'})
                }
            })
            .catch(function () {
                setState({...state, open: true, severity: 'warning', toastMsg: 'Something went wrong!'})
            });
    };

    const onChangeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    };

    function clickLogin() {
        navigate("/", {replace: true})
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={data.firstName}
                                    onChange={onChangeHandler}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={data.lastName}
                                    autoComplete="family-name"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={data.email}
                                    autoComplete="email"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={() => clickLogin()} variant="body2">
                                    Already have an account? Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {/*Toast Tag*/}
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnack}
                              anchorOrigin={{vertical, horizontal}} key={vertical + horizontal}>
                        <Alert onClose={handleCloseSnack} severity={severity} sx={{width: '100%'}}>
                            {toastMsg}
                        </Alert>
                    </Snackbar>

                </Box>
                <Footer/>
            </Container>
        </ThemeProvider>
    );
}