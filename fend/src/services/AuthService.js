import { API_BASE_URL } from '../constants/constants';

class AuthService {
    async sendOtp(phoneOrEmail) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneOrEmail }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send OTP');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async verifyOtp(phoneOrEmail, otp) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneOrEmail, otp }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to verify OTP');
            }

            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    getToken() {
        return localStorage.getItem('authToken');
    }

    isAuthenticated() {
        const token = this.getToken();
        return !!token;
    }

    logout() {
        localStorage.removeItem('authToken');
    }

    getAuthHeaders() {
        const token = this.getToken();
        return token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        };
    }
}

export default new AuthService();
