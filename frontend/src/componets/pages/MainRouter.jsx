import React from 'react';
import Login from "./Login";
import SignUp from "./SignUp";
import {Route, Routes} from 'react-router-dom';
import Tasks from "../elements/Tasks";
import Dashboard from "../elements/Dashboard";
import AddTask from "../elements/AddTask";

function MainRouter(props) {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign" element={<SignUp />} />
            <Route path="/home" element={<Dashboard context={'tasks'} />} />
            <Route path="/add" element={<Dashboard context={'add'} />} />
        </Routes>
    );
}

export default MainRouter;