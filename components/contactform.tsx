"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { LuCircleArrowRight } from "react-icons/lu";

const unitType = [
  { key: 1, value: "Studio", label: "Studio" },
  { key: 2, value: "1 Bedroom", label: "1 Bedroom" },
  { key: 3, value: "2 Bedroom", label: "2 Bedroom" },
  { key: 4, value: "3 Bedroom", label: "3 Bedroom" },
  { key: 5, value: "Tandem Unit", label: "Tandem Unit" },
  { key: 6, value: "Studio w/ Parking", label: "Studio w/ Parking" },
  { key: 7, value: "1 Bedroom w/ Parking", label: "1 Bedroom w/ Parking" },
  { key: 8, value: "2 Bedroom w/ Parking", label: "2 Bedroom w/ Parking" },
  { key: 9, value: "3 Bedroom w/ Parking", label: "3 Bedroom w/ Parking" },
  { key: 10, value: "Tandem Unit w/ Parking", label: "Tandem Unit w/ Parking" },
  {
    key: 11,
    value: "Studio w/ Tandem Parking",
    label: "Studio w/ Tandem Parking",
  },
  {
    key: 12,
    value: "1 Bedroom w/ Tandem Parking",
    label: "1 Bedroom w/ Tandem Parking",
  },
  {
    key: 13,
    value: "2 Bedroom w/ Tandem Parking",
    label: "2 Bedroom w/ Tandem Parking",
  },
  {
    key: 14,
    value: "3 Bedroom w/ Tandem Parking",
    label: "3 Bedroom w/ Tandem Parking",
  },
  {
    key: 15,
    value: "Tandem Unit w/ Tandem Parking",
    label: "Tandem Unit w/ Tandem Parking",
  },
  { key: 16, value: "1 Parking Slot", label: "1 Parking Slot" },
  { key: 17, value: "Tandem Parking", label: "Tandem Parking" },
];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .length(11, "Phone number must be exactly 11 digits")
    .matches(/^09/, "Phone number must start with '09'")
    .required("Phone number is required"),

  property_name: Yup.string().required("Property name is required"),
  unit_type: Yup.string().required("Unit type is required"),
  property_location: Yup.string().required("Property location is required"),
  message: Yup.string().required("Message is required"),
});

interface Property {
  id: string;
  name: string;
  property: {
    name: string;
  };
}

interface PropertyProps {
  data: Property[];
}

const ContactForm: React.FC<PropertyProps> = ({ data }) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    property_name: "",
    unit_type: "",
    property_location: "",
    message: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any,
  ) => {
    try {
      // Sending inquiry to the API
      const contactResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/submit-inquiry`,
        values,
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
            Accept: "application/json",
          },
        },
      );

      // Sending email notification for viewing request - agent
      const emailAgentResponse = await axios.post(
        `/api/email/inquiry/agent`,
        {
          name: values.first_name + " " + values.last_name,
          sender_email: values.email,
          phone: values.phone,
          property_name: values.property_name,
          unit_type: values.unit_type,
          property_location: values.property_location,
          message: values.message,
          email: "infinitech.justin2024@gmail.com",
        },
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
            Accept: "application/json",
          },
        },
      );

      if (contactResponse?.data && emailAgentResponse?.data) {
        resetForm({
          values: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            property_name: "",
            unit_type: "",
            property_location: "",
            message: "",
          },
        });
        toast.success("Inquiry sent successfully!");
      }
    } catch (error) {
      toast.error("Error! Please try again!");
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* First Name */}
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="First Name"
                  labelPlacement="inside"
                  name="first_name"
                  placeholder="e.g., Juan"
                  value={values.first_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="first_name"
                />
              </div>

              {/* Last Name */}
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Last Name"
                  labelPlacement="inside"
                  name="last_name"
                  placeholder="e.g., Dela Cruz"
                  value={values.last_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="last_name"
                />
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Email"
                  labelPlacement="inside"
                  name="email"
                  placeholder="e.g., juandelacruz@gmail.com"
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="email"
                />
              </div>

              {/* Phone Number */}
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Phone Number"
                  labelPlacement="inside"
                  name="phone"
                  placeholder="e.g., 09924401097"
                  type="text"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    // Allow only numbers and limit to 11 characters
                    const regex = /^[0-9]{0,11}$/;
                    if (regex.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputMode="numeric" // Shows numeric keyboard on mobile
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="phone"
                />
              </div>

              {/* Property Name */}
              <div className="col-span-2 md:col-span-1">
                <Select
                  label="Property"
                  labelPlacement="inside"
                  placeholder="Select Property"
                  selectedKeys={
                    values.property_name ? [values.property_name] : []
                  }
                  onSelectionChange={(selected) => {
                    const value = Array.from(selected)[0] || "";
                    setFieldValue("property_name", value);
                  }}
                >
                  {data
                    .filter((property) => property && property.name)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((property) => (
                      <SelectItem key={property.name} textValue={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                </Select>
                <ErrorMessage
                  className="text-red-500 text-tiny"
                  component="div"
                  name="property_name"
                />
              </div>

              {/* Unit Type */}
              <div className="col-span-2 md:col-span-1">
                <Select
                  label="Unit/PS Type"
                  labelPlacement="inside"
                  placeholder="Select Unit/PS Type"
                  selectedKeys={
                    values.unit_type ? new Set([values.unit_type]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] || "";
                    setFieldValue("unit_type", selected);
                  }}
                >
                  {unitType.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </Select>
                <ErrorMessage
                  className="text-red-500 text-tiny"
                  component="div"
                  name="unit_type"
                />
              </div>

              {/* Property Location */}
              <div className="col-span-2">
                <Input
                  label="Property Location"
                  labelPlacement="inside"
                  name="property_location"
                  placeholder="e.g., Makati City, Philippines"
                  value={values.property_location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="property_location"
                />
              </div>

              {/* Message */}
              <div className="col-span-2">
                <Textarea
                  label="Message"
                  labelPlacement="inside"
                  name="message"
                  placeholder="Leave us a message or notes."
                  value={values.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  component="div"
                  name="message"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              size="lg"
              className="bg-[#192D4D] hover:bg-[#192D4D]/80 text-white uppercase"
              endContent={<LuCircleArrowRight size={24} />}
              isDisabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
