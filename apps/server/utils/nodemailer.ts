import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${process.env.BETTER_AUTH_URL}/api/v1/auth/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail", // OR smtp settings (better)
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your Email",
    html: `
        <h2>Verify Your Account</h2>
        <p>Click the button 👇 to activate your account</p>
        <a href="${verifyUrl}" style="padding:10px;color:white;background:#0066ff;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>
    `
  });
};
