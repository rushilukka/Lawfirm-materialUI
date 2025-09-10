const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Otp = require('../db-schema/otpSchema');
require('dotenv').config();

class AuthService {
    constructor() {
        // Using the same working configuration as bookingService
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'Rushi.lukka.315',
                pass: 'gofmpfbvzldxhosc'
            }
        });
    }

    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendOTP(phoneOrEmail) {
        try {
            const otp = this.generateOTP();
            
            // Save OTP to database
            await Otp.create({
                phoneOrEmail,
                otp
            });

            // Send OTP via email
            if (phoneOrEmail.includes('@')) {
                await this.transporter.sendMail({
                    from: 'rushi.lukka.315@gmail.com',
                    to: phoneOrEmail,
                    subject: 'Your OTP for Authentication',
                    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
                });
            } else {
                // TODO: Implement SMS sending logic using Twilio
                throw new Error('SMS OTP not implemented yet. Please use email instead.');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async verifyOTP(phoneOrEmail, otp) {
        try {
            // Find OTP in database
            const otpRecord = await Otp.findOne({
                phoneOrEmail,
                otp
            });

            if (!otpRecord) {
                throw new Error('Invalid OTP');
            }

            // Delete OTP after verification
            await Otp.deleteOne({ _id: otpRecord._id });

            // Generate JWT
            const token = jwt.sign(
                { phoneOrEmail },
                process.env.JWT_SECRET,
                { expiresIn: '10d' }
            );

            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();
