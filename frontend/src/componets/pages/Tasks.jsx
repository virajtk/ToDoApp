import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Title from "../elements/Title";
import {useEffect, useState} from "react";
import Loading from "../elements/Loading";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Snackbar, TableHead, TextField, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {useNavigate} from "react-router-dom";


// Toast config
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// confirmation dialog config
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Tasks() {

    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

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

    // Confirmation Dialog configs
    const [openDelConfirmation, setOpenDelConfirmation] = React.useState(false);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    useEffect(() => {
        setIsLoaded(false)
        getTasksList();
    }, [])

    const getTasksList = () => {

    }

    const deleteHandler = (task) => {
        setOpenDelConfirmation(true)
    }
    const deleteTask = (task) => {

    }

    function addTask() {
        navigate('/add', {replace: true})
    }

    if (!isLoaded) {
        return (
            <TableContainer>
                <Title> My Tasks List </Title>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <Button onClick={() => {
                        addTask()
                    }}> <PostAddIcon/> ADD NEW TASK </Button>
                </Box>
                <Loading/>
                <Loading/>
                <Loading/>
            </TableContainer>
        );
    }
    return (
        <TableContainer>
            <Title> My Tasks List </Title>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Button onClick={() => {

                }}> <PostAddIcon/> ADD NEW TASK </Button>
            </Box>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Index</TableCell>
                        <TableCell align="center">Task</TableCell>
                        <TableCell align="center">Created Date</TableCell>
                        <TableCell align="center">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow
                            key={task._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center"> {index + 1}  </TableCell>
                            <TableCell align="center">{task.desc}</TableCell>
                            <TableCell
                                align="center">{new Date(task.created_at).toLocaleDateString("en-US", options)}</TableCell>
                            <TableCell align="center"><Button
                                onClick={() => deleteHandler(task)}><DeleteIcon/></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/*Toast Tag*/}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnack}
                      anchorOrigin={{vertical, horizontal}} key={vertical + horizontal}>
                <Alert onClose={handleCloseSnack} severity={severity} sx={{width: '100%'}}>
                    {toastMsg}
                </Alert>
            </Snackbar>

            {/*Confirmation Dialog*/}
            <Dialog
                open={openDelConfirmation}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDelConfirmation(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Confirmation. You can not undone this.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDelConfirmation(false)
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        deleteTask(activeTask);
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>

        </TableContainer>
    )
}
