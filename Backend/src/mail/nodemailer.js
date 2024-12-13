import nodemailer from "nodemailer" ;


import dotenv from "dotenv" ;
dotenv.config()

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return otp;
  };

const sendVerificationEmail = async (email, token) => {

    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure : true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
      },
    });

    // const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,  // The recipient's email address
        subject: 'Your OTP for email verification',
        text: `Your one-time OTP for email verification is: ${otp}`,
      };

      try {
        // Send the email with OTP
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
        return otp; // Return OTP to be stored for verification
      } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Error sending OTP');
      }


};


export { sendVerificationEmail , generateOTP};