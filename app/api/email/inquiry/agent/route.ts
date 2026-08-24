// app\api\email\listing\approved\route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import { InquiryNotificationEmail } from "@/emails/inquiry_agent_email";

export async function POST(req: Request) {
  const {
    name,
    sender_email,
    phone,
    property_name,
    unit_type,
    property_location,
    message,
    email,
  } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailHtml = await render(
    InquiryNotificationEmail({
      name: name,
      sender_email: sender_email,
      phone: phone,
      property_name: property_name,
      unit_type: unit_type,
      property_location: property_location,
      message: message,
      email: email,
    }),
  );

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "ALVEO : New Inquiry!",
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);

  return NextResponse.json({
    status: "success",
    message: "Email sent successfully",
  });
}
