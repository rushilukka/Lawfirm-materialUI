import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import Popup  from './Popup-DispMsg';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const { sendOtp, verifyEmailWithOtp } = useAuth();
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
            await verifyEmailWithOtp(email, otp);
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
        <>
        <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                        mb: 2,
                        color: '#666',
                        backgroundColor: '#f8f9fa',
                        padding: 1.5,
                        borderRadius: 1,
                        border: '1px solid #e0e0e0'
                    }}
                >
                    Note: This email verification is only for booking purposes.  
                </Typography>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                padding: 2,
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    padding: 3, 
                    maxWidth: 400, 
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)'
                }}
            > 
                <Typography 
                    variant="h5" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                        mb: 2,
                        color: '#2c3e50',
                        fontWeight: 500
                    }}
                >
                    Verify Email
                </Typography>
                
                <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="dense"
                        disabled={otpSent}
                        placeholder="Enter your email address"
                        required
                        sx={{
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1
                            }
                        }}
                    />

                    {otpSent && (
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            margin="dense"
                            required
                            sx={{
                                mb: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1
                                }
                            }}
                        />
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ 
                            mt: 2,
                            mb: 1,
                            py: 1,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
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
        </>
    );
};

export default VerifyEmail;
