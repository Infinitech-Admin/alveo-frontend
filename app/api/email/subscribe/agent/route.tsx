// app\api\email\listing\approved\route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import DmciWelcomeEmail from "@/emails/newsletter_email";

export async function POST(req: Request) {
  const { sender_email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailHtml = await render(
    DmciWelcomeEmail({
      sender_email: sender_email,
    }),
  );

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: sender_email,
    subject: "ALVEO By Ella: Thank You for Subscribing!",
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);

  return NextResponse.json({
    status: "success",
    message: "Email sent successfully",
  });
}
