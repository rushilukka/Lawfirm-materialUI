const authService = require('../services/authService');

class AuthController {
    async sendOTP(req, res) {
        try {
            const { phoneOrEmail } = req.body;
            
            if (!phoneOrEmail) {
                return res.status(400).json({ message: 'Phone number or email is required' });
            }

            await authService.sendOTP(phoneOrEmail);
            res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ message: 'Error sending OTP', error: error.message });
        }
    }

    async verifyOTP(req, res) {
        try {
            const { phoneOrEmail, otp } = req.body;
            
            if (!phoneOrEmail || !otp) {
                return res.status(400).json({ message: 'Phone/email and OTP are required' });
            }

            const token = await authService.verifyOTP(phoneOrEmail, otp);
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ message: 'Error verifying OTP', error: error.message });
        }
    }
}

module.exports = new AuthController();
