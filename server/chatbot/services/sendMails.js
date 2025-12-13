import nodemailer from "nodemailer";

export const sendEmails = async (candidateEmail, recruiterEmail, jobTitle) => {
  try {
    // 1️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP config if you’re using another provider
      auth: {
        user: process.env.EMAIL_USER, // your Gmail ID
        pass: process.env.EMAIL_PASS, // app password (not your Gmail password)
      },
    });

    // 2️⃣ Create mail options for candidate
    const candidateMail = {
      from: process.env.EMAIL_USER,
      to: candidateEmail,
      subject: `Your application for ${jobTitle} has been received`,
      html: `
        <h3>Hi there 👋</h3>
        <p>We’ve received your application for <b>${jobTitle}</b>.</p>
        <p>Our recruiter will reach out to you soon. 🙌</p>
      `,
    };

    // 3️⃣ Create mail options for recruiter
    const recruiterMail = {
      from: process.env.EMAIL_USER,
      to: recruiterEmail,
      subject: `New applicant for ${jobTitle}`,
      html: `
        <h3>Hello Recruiter 👋</h3>
        <p>A candidate just applied for <b>${jobTitle}</b>.</p>
        <p>Check your dashboard for details.</p>
      `,
    };

    // 4️⃣ Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(candidateMail),
      transporter.sendMail(recruiterMail),
    ]);

    console.log(" Emails sent to both candidate and recruiter!");
  } catch (err) {
    console.error(" Error sending emails:", err);
  }
};
