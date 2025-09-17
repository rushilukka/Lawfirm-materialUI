import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

const getUserFromToken = () => {
    const token = AuthService.getToken();
    if (token) {
        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            return tokenData;
        } catch (error) {
            console.error('Error parsing token:', error);
            return null;
        }
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
    const [user, setUser] = useState(getUserFromToken());

    useEffect(() => {
        // Update user info when authentication state changes
        if (isAuthenticated) {
            setUser(getUserFromToken());
        } else {
            setUser(null);
        }
    }, [isAuthenticated]);

    const loginWithOtp = useCallback(async (email, otp) => {
        try {
            const data = await AuthService.verifyOtp(email, otp);
            setIsAuthenticated(true);
            setUser(getUserFromToken());
            return data;
        } catch (error) {
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
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
            sendOtp: AuthService.sendOtp,
            user
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
