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

    async sendOTP(email) {
        try {
            const otp = this.generateOTP();
            
            // Save OTP to database
            await Otp.create({
                email: email, // keeping field name for backward compatibility
                otp
            });

            // Send OTP via email
            await this.transporter.sendMail({
                from: 'rushi.lukka.315@gmail.com',
                to: email,
                subject: 'Your OTP for Vidhigna Law Firm Authentication',
                html: `
                    <h2>Welcome to Vidhigna Law Firm</h2>
                    <p>Your One Time Password (OTP) for authentication is:</p>
                    <h1 style="color: #4CAF50;">${otp}</h1>
                    <p>This OTP will expire in 5 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                    <br>
                    <p>Best regards,</p>
                    <p>Vidhigna Law Firm Team</p>
                `
            });

            return true;
        } catch (error) {
            throw error;
        }
    }

    async verifyOTP(email, otp) {
        try {
            // Find the most recent OTP for this email
            const otpRecord = await Otp.findOne({
                email: email,
                otp
            }).sort({ createdAt: -1 });

            if (!otpRecord) {
                throw new Error('Invalid OTP');
            }

            // Check if OTP is expired (5 minutes)
            const otpCreationTime = new Date(otpRecord.createdAt).getTime();
            const currentTime = new Date().getTime();
            if (currentTime - otpCreationTime > 5 * 60 * 1000) {
                await Otp.deleteOne({ _id: otpRecord._id });
                throw new Error('OTP has expired. Please request a new one.');
            }

            // Delete all OTPs for this email after verification
            await Otp.deleteMany({ email: email });

            // Generate JWT
            const token = jwt.sign(
                { email: email }, // keeping key as email for backward compatibility
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
