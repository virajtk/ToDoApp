import React from 'react';
import Login from "./Login";
import SignUp from "./SignUp";
import {Route, Routes} from 'react-router-dom';

function MainRouter(props) {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign" element={<SignUp />} />
        </Routes>
    );
}

export default MainRouter;