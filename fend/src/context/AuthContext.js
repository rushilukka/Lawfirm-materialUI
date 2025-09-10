import React, { createContext, useContext, useState, useCallback } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

    const loginWithOtp = useCallback(async (phoneOrEmail, otp) => {
        try {
            const data = await AuthService.verifyOtp(phoneOrEmail, otp);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        AuthService.logout();
        setIsAuthenticated(false);
    }, []);

    const getToken = useCallback(() => {
        return AuthService.getToken();
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            loginWithOtp,
            logout,
            getToken,
            sendOtp: AuthService.sendOtp
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
