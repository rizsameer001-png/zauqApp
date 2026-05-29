import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"ZauqApp" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error: error.message };
  }
};

export const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B4513;">Welcome to ZauqApp!</h2>
      <p>Dear ${user.name},</p>
      <p>Welcome to the world's most beautiful literary ecosystem. Start exploring Urdu poetry, Hindi literature, and more.</p>
      <a href="${process.env.CLIENT_URL}/explore" style="display: inline-block; padding: 12px 24px; background: #8B4513; color: white; text-decoration: none; border-radius: 4px;">Start Exploring</a>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: 'Welcome to ZauqApp - Your Literary Journey Begins',
    html
  });
};
