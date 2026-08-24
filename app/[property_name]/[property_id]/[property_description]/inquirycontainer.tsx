"use client";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import SendInquiry from "./sendinquiry";
import SendAppointment from "./sendappointment";

interface InquiryProps {
  data: any;
}

const InquiryContainer: React.FC<InquiryProps> = ({ data }) => {
  return (
    <section className="w-full flex flex-col justify-center py-8">
      <Card>
        <CardBody>
          <Tabs aria-label="Options">
            <Tab key="inquiry" title="Inquiry">
              <SendInquiry inquiry={data} />
            </Tab>
            <Tab key="schedule" title="Schedule">
              <SendAppointment inquiry={data}/>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
};

export default InquiryContainer;
