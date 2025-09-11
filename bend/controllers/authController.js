const authService = require('../services/authService');

class AuthController {
    async sendOTP(req, res) {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({ message: 'Email address is required' });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            await authService.sendOTP(email);
            res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ message: 'Error sending OTP', error: error.message });
        }
    }

    async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;
            
            if (!email || !otp) {
                return res.status(400).json({ message: 'Email and OTP are required' });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            const token = await authService.verifyOTP(email, otp);
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ message: 'Error verifying OTP', error: error.message });
        }
    }
}

module.exports = new AuthController();
