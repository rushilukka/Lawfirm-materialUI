// src/components/PrivateRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Fade } from '@mui/material';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Simulate a small delay for smooth transition
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Fade in={true} timeout={300}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}
                >
                    <CircularProgress />
                </Box>
            </Fade>
        );
    }

    return isAuthenticated ? (
        <Fade in={true} timeout={300}>
            <div>{children}</div>
        </Fade>
    ) : (
        <Navigate 
            to="/verifyEmail" 
            state={{ from: location.pathname }}
            replace 
        />
    );
};

export default PrivateRoute;
