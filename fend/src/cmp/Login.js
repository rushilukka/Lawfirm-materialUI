import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import Popup  from './Popup-DispMsg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { sendOtp, loginWithOtp } = useAuth();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            await sendOtp(email);
            setOtpSent(true);
            setSuccess('OTP sent successfully! Please check your email.');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await loginWithOtp(email, otp);
            setSuccess('Logged in successfully!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: 2
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                
                <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        disabled={otpSent}
                        placeholder="Enter your email address"
                        required
                    />

                    {otpSent && (
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            margin="normal"
                            required
                        />
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : otpSent ? (
                            'Verify OTP'
                        ) : (
                            'Send OTP'
                        )}
                    </Button>
                </form>

                {error && <Popup message={error} variant="error" />}
                {success && <Popup message={success} variant="success" />}
            </Paper>
        </Box>
    );
};

export default Login;
