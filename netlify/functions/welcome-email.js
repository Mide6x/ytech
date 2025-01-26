import nodemailer from "nodemailer";
import process from 'process';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const handler = async (event) => {
    console.log('Welcome email function triggered');
    console.log('Event body:', event.body);

    if (event.httpMethod !== 'POST') {
        console.log('Invalid method:', event.httpMethod);
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email, username } = JSON.parse(event.body);
        console.log('Attempting to send email to:', email);

        await transporter.sendMail({
            from: {
                name: "YorùbáTech Learning",
                address: process.env.SMTP_USER
            },
            to: email,
            subject: "Welcome to YorùbáTech! 🎉",
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', sans-serif;">
                    <h2 style="color: #2D3748; margin-bottom: 16px; font-size: 24px;">Ẹ kú àbọ̀, ${username}! 👋</h2>
                    <p style="color: #4A5568; line-height: 1.6;">Welcome to YorùbáTech! We're excited to have you join our community of Yorùbá language learners.</p>
                    <p style="color: #4A5568; line-height: 1.6;">Here's what you can expect:</p>
                    <ul style="color: #4A5568; line-height: 1.6;">
                        <li>Interactive lessons designed for all levels</li>
                        <li>Daily streaks and points to track your progress</li>
                        <li>Audio and video content for immersive learning</li>
                    </ul>
                    <p style="margin: 24px 0;">
                        <a href="https://klearnsyoruba.com.ng/dashboard" 
                           style="background-color: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                            Start Learning Now
                        </a>
                    </p>
                    <p style="color: #4A5568; line-height: 1.6;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    <div style="margin-top: 24px;">
                        <p style="color: #4A5568;">E kàárọ̀ o! 👋<br/>YorùbáTech Team</p>
                    </div>
                </div>
            `,
        });

        console.log('Email sent successfully to:', email);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Welcome email sent successfully" })
        };
    } catch (error) {
        console.error("Email error details:", {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack
        });
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: "Error sending welcome email",
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            })
        };
    }
}; 