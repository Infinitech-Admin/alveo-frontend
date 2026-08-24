import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InquiryNotificationEmailProps {
  name?: string;
  sender_email?: string;
  phone?: string;
  property_name?: string;
  unit_type?: string;
  property_location?: string;
  message?: string;
  email?: string;
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

export const InquiryNotificationEmail = ({
  name,
  sender_email,
  phone,
  property_name,
  unit_type,
  property_location,
  message,
  email,
}: InquiryNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Agent received a new inquiry notification</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          alt="ALVEO Land Logo"
          height="170"
          src={`${apiUrl}/logo/dmci-logo-only.png`}
          style={logo}
        />
        <Heading style={h1}>New Inquiry Notification</Heading>
        <Text style={text}>Hello Agent,</Text>
        <Text style={text}>
          You have received a new inquiry with the following details:
        </Text>
        <Text style={text}>
          <b>Sender Name:</b> {name}
          <br />
          <b>Email:</b> {sender_email}
          <br />
          <b>Phone:</b> {phone}
          <br />
          <b>Property Name:</b> {property_name}
          <br />
          <b>Unity Type:</b> {unit_type}
          <br />
          <b>Property Location:</b> {property_location}
          <br />
          <b>Message:</b> {message}
        </Text>
        <Text style={text}>
          Please respond to the inquiry as soon as possible.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © 2025 ALVEO Land. All rights reserved.
          <br />
          Philippines
        </Text>
      </Container>
    </Body>
  </Html>
);

export default InquiryNotificationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const logo = {
  margin: "0 auto",
  marginBottom: "24px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
