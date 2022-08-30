import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Title from "./Title";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {TextareaAutosize} from "@mui/material";
import {TextDecreaseTwoTone} from "@mui/icons-material";

const theme = createTheme();

export default function AddTask() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        desc: ''
    });

    const onChangeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        navigate('/home', {replace: true})
    };

    function back() {
        navigate('/home', {replace: true})
    }

    return (
        <ThemeProvider theme={theme}>
            <Title> Add Task </Title>
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="desc"
                            label="Task Description"
                            name="desc"
                            autoComplete="desc"
                            value={data.desc}
                            onChange={onChangeHandler}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Submit
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button onClick={back} variant="body2">
                                    Go Back?
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}