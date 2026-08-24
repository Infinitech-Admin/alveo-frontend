import { Divider, Button, useDisclosure } from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { LuMessageCircleQuestion } from "react-icons/lu";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Input, Textarea, Checkbox } from "@heroui/react";
import Link from "next/link";
import TermsAndConditionsModal from "@/components/modal/TermsAndConditionsModal";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
  agreement: false,
};

interface InquiryFormProps {
  inquiry: Listings;
}

interface Listings {
  property_price: string;
  property_name: string;
  property_location: string;
  property_type: string;
  property: {
    name: string;
  };
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^[0-9]{11}$/,
      "Phone number must be exactly 11 digits and contain only numbers",
    )
    .matches(/^09/, "Phone number must start with '09'")
    .required("Phone number is required"),

  message: Yup.string().required("Message is required"),
  agreement: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions.",
  ),
});

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const SendInquiry: React.FC<InquiryFormProps> = ({ inquiry }) => {
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      await axios.post(
        `${apiUrl}/api/user/submit-inquiry`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          message: values.message,
          email: values.email,
          phone: values.phone,
          property_name: inquiry.property.name,
          property_location: inquiry.property_location,
          unit_type: inquiry.property_type,
        },
        {
          headers: {
            "User-ID": "01JGZN73V2Y5Y68SZ586PN9Y48",
          },
        },
      );

      resetForm({
        values: {
          ...initialValues,
          agreement: false,
        },
      });

      toast.success("Inquiry submitted successfully!");
    } catch {
      toast.error("Error submitting inquiry!");
    } finally {
      setSubmitting(false);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-2">
        <div className="bg-[#0F1B2E] p-2 rounded-full text-[#79a0dd]">
          <LuMessageCircleQuestion size={48} />
        </div>
        <div>
          <h1 className="text-2xl uppercase font-semibold">Send Inquiry</h1>
          <p className="text-sm text-default-500 font-normal">
            Fill out the fields below to send us your inquiry. Our team will get
            back to you as soon as possible.
          </p>
        </div>
      </div>

      <Divider className="my-4" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Field
                  as={Input}
                  name="first_name"
                  label="First Name"
                  labelPlacement="inside"
                  placeholder="e.g. Juan"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="first_name"
                />
              </div>
              <div className="w-full">
                <Field
                  as={Input}
                  name="last_name"
                  label="Last Name"
                  labelPlacement="inside"
                  placeholder="e.g. Pedro"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="last_name"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Field
                  as={Input}
                  name="email"
                  label="Email"
                  labelPlacement="inside"
                  placeholder="e.g. email@gmail.com"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="email"
                />
              </div>
              <div className="w-full">
                <Field
                  as={Input}
                  name="phone"
                  label="Phone"
                  labelPlacement="inside"
                  placeholder="e.g. 09260919235"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // Allow only numbers and limit the length to 11 digits
                    e.target.value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 11);
                  }}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="phone"
                />
              </div>
            </div>

            <Field
              as={Textarea}
              name="message"
              label="Your Message to the Agent"
              labelPlacement="inside"
              placeholder="Leave us a message..."
            />
            <ErrorMessage
              className="text-red-500 text-sm"
              component="div"
              name="message"
            />
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
              name="agreement"
              component="div"
              className="text-red-500 text-sm"
            />

            <Divider className="my-4" />

            <div className="flex flex-col md:flex-row items-center justify-end gap-4">
              <Button
                className="w-full"
                color="danger"
                variant="flat"
                type="reset"
              >
                Cancel
              </Button>
              <Button
                className="w-full"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <TermsAndConditionsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default SendInquiry;
