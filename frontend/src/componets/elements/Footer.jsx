import React from 'react';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Footer(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://wiley.com/">
                Wiley
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Footer;