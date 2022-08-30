import React from 'react';
import {Skeleton} from "@mui/material";
import Box from "@mui/material/Box";

function Loading(props) {
    return (
        <Box sx={{ width: 1000, margin: 3, minWidth: 300 }} >
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    );
}

export default Loading;
