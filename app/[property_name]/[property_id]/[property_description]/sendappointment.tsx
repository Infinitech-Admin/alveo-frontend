import {
  Button,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  Input,
  Link,
  Divider,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { LuCalendarRange } from "react-icons/lu";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TermsAndConditionsModal from "@/components/modal/TermsAndConditionsModal";

interface InquiryFormProps {
  inquiry: Listings;
}

interface Listings {
  max_price: string;
  name: string;
  location: string;
  property: {
    name: string;
  };
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  name: Yup.string().required("Full name is required"),
  type: Yup.string().required("Appointment type is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .length(11, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
  agreement: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions.",
  ),
  message: Yup.string().required("Message is required"),
});

const viewing = [
  { key: 1, label: "Property Viewing", value: "Property Viewing" },
  { key: 2, label: "Property Consultation", value: "Property Consultation" },
];

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const SendAppointment: React.FC<InquiryFormProps> = ({ inquiry }) => {
  const handleAppointmentSubmit = async (values: any, { resetForm }: any) => {
    try {
      await axios.post(`${apiUrl}/api/user/request-viewing`, values, {
        headers: {
          "User-ID": "01JGZN73V2Y5Y68SZ586PN9Y48",
        },
      });

      resetForm({
        values: {
          user_id: values.user_id,
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          type: "",
          status: "Pending",
          message: "",
          properties: inquiry.property.name,
          agreement: false,
        },
      });

      toast.success("Appointment submitted successfully!");
    } catch (error) {
      toast.error("Error! Please Try Again!");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-2">
        <div className="bg-[#0F1B2E] p-2 rounded-full text-[#192D4D]">
          <LuCalendarRange size={48} />
        </div>
        <div>
          <h1 className="text-2xl uppercase font-semibold">
            Book an On-Site Viewing
          </h1>
          <p className="text-sm text-default-500 font-normal">
            Please fill out the form below to schedule your on-site visit. Our
            team will get back to you as soon as possible.
          </p>
        </div>
      </div>
      <Divider className="my-4" />
      <Formik
        initialValues={{
          user_id: "01JGZN73V2Y5Y68SZ586PN9Y48",
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          type: "",
          status: "Pending",
          message: "",
          properties: inquiry.property.name,
          agreement: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAppointmentSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <Field
              as={Input}
              name="name"
              label="Full Name"
              placeholder="e.g. Juan Pedro"
            />
            <ErrorMessage
              className="text-red-500 text-sm"
              component="div"
              name="name"
            />

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <Field
                  as={Input}
                  name="email"
                  label="Email"
                  placeholder="e.g. email@gmail.com"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="email"
                />
              </div>
              <div className="flex flex-col w-full">
                <Field
                  as={Input}
                  name="phone"
                  label="Phone Number"
                  placeholder="e.g. 09924401097"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="phone"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col w-full">
                <Field
                  as={Input}
                  name="date"
                  label="Date"
                  type="date"
                  min={today}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="date"
                />
              </div>
              <div className="flex flex-col w-full">
                <Field as={Input} name="time" label="Time" type="time" />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="time"
                />
              </div>
            </div>

            <div>
              <Field name="type">
                {({ field, form }: any) => (
                  <Select
                    label="Appointment For"
                    selectedKeys={[field.value]}
                    onSelectionChange={(selected) => {
                      const selectedValue = Array.from(selected)[0]; // Formik expects string
                      form.setFieldValue("type", selectedValue);
                    }}
                  >
                    {viewing.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </Field>
              <ErrorMessage
                className="text-red-500 text-sm"
                component="div"
                name="type"
              />
            </div>

            <div>
              <Field
                as={Textarea}
                name="message"
                label="Your Message to the Agent"
                placeholder="Leave us a message..."
              />
              <ErrorMessage
                className="text-red-500 text-sm"
                component="div"
                name="message"
              />
            </div>

            <Field name="agreement">
              {({ form }: any) => (
                <label className="flex items-center space-x-2">
                  <Checkbox
                    id="agreement"
                    isSelected={form.values.agreement}
                    onValueChange={(checked: boolean) => {
                      form.setFieldValue("agreement", checked);
                    }}
                  />
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={onOpen}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      terms and conditions.
                    </button>
                  </span>
                </label>
              )}
            </Field>

            <ErrorMessage
              className="text-red-500 text-sm"
              component="div"
              name="agreement"
            />

            <Divider className="my-4" />
            <Button
              size="lg"
              className="w-full"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit Appointment"}
            </Button>
          </Form>
        )}
      </Formik>
      <TermsAndConditionsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default SendAppointment;
