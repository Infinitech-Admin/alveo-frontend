import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

export const DmciWelcomeEmail = ({ sender_email }: any) => (
  <Html>
    <Head />
    <Preview>Thank You for Subscribing - ALVEO Land by: Ella Sarmiento</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <table
            width="100%"
            style={{
              marginBottom: "24px",
              marginTop: "24px",
              textAlign: "center",
            }}
          >
            <tr style={{ verticalAlign: "bottom" }}>
              <td
                style={{
                  width: "80px",
                  paddingRight: "10px",
                  verticalAlign: "bottom",
                }}
              >
                <Img
                  alt="ALVEO Land Logo"
                  height="80"
                  src={`${apiUrl}/alveo-logo-white-small-768x396.png`}
                  style={{ display: "block", margin: "0 auto" }}
                />
              </td>
              <td style={{ verticalAlign: "bottom" }}>
                <Text
                  style={{
                    color: "#03329E",
                    fontSize: "48px",
                    fontWeight: 700,
                    textDecoration: "underline",
                    textDecorationThickness: "2px",
                    textUnderlineOffset: "5px",
                    textAlign: "left",
                    lineHeight: "1.2",
                    margin: "0",
                  }}
                >
                  ALVEO LAND
                </Text>
              </td>
            </tr>
          </table>

          <Hr style={hr} />
          <Text style={paragraph}>Good Day!,</Text>
          <Text style={paragraph}>
            Thank you for subscribing to ALVEO Land by: Ella Sarmiento
            newsletter! We&apos;re excited to keep you updated on the latest
            property listings, exclusive offers, and real estate insights.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Stay tuned for our upcoming newsletters, and feel free to reach out
            if you have any questions or specific property preferences.
          </Text>
          <Button href="https://staging-alveo.vercel.app/" style={button}>
            Visit Our Website
          </Button>
          <Hr style={hr} />
          <Text style={paragraphs}>
            If you ever wish to unsubscribe, you can do so by clicking{" "}
            <Link
              href={`https://staging-alveo.vercel.app/subscription?email=${sender_email}`}
              style={anchor}
            >
              here
            </Link>
            {/* <Link
              href={`http://localhost:3000/subscription?email=${sender_email}`}
              style={anchor}
            >
              here
            </Link>
             */}
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Metro Manila, Philippines
            <br />
            LandLine: 02-8646-6136 | Mobile: (+63) 917 548 09994
            <br />
            Email: elladmcihomes.ph@gmail.com | Website:{" "}
            <Link href="https://staging-alveo.vercel.app/" style={anchor}>
              dmci-agent.vercel.app
            </Link>
            <br />
            Office Hours: Monday to Friday, 8:00 AM - 5:00 PM
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default DmciWelcomeEmail;

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 0px",
  marginBottom: "64px",
  maxWidth: "600px",
  width: "100%",
};

const box = {
  padding: "24px",
};

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const paragraphs = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "20px auto",
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "50%",
  padding: "10px",
  margin: "20px auto",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "20px auto",
  textAlign: "center" as const,
};
