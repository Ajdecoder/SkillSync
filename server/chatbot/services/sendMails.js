import nodemailer from "nodemailer";

export const sendEmails = async (candidateEmail, recruiterEmail, jobTitle) => {
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    
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

    
    await Promise.all([
      transporter.sendMail(candidateMail),
      transporter.sendMail(recruiterMail),
    ]);

    console.log(" Emails sent to both candidate and recruiter!");
  } catch (err) {
    console.error(" Error sending emails:", err);
  }
};
