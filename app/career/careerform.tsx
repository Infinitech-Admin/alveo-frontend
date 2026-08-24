import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { getAuthHeaders } from "../auth";

const position = [
  { key: "Referrer", label: "REFERRER" },
  { key: "Sub-agent", label: "SUB-AGENT" },
  { key: "Broker", label: "PARTNER BROKER" },
  { key: "Partner", label: "ACCREDITED PARTNER" },
];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .length(11, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),

  address: Yup.string().required("Address is required"),
  position: Yup.string().required("Position is required"),
  resume: Yup.mixed().required("Resume is required"),
});

const CareerForm = () => {
  const [type, setType] = useState("file");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    resume: "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const headers = {
        "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/applications`,
        values,
        { headers }
      );

      if (response?.data) {
        resetForm();
        toast.success("Application sent successfully!");

        setType("text");
        setTimeout(() => {
          setType("file");
        }, 1);
      }
    } catch (error) {
      toast.error("Error! Please try again.");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-4" encType="multipart/form-data">
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Juan Dela Cruz"
            size="sm"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage
            className="text-red-500 text-sm"
            component="div"
            name="name"
          />

          <Input
            label="Email"
            name="email"
            placeholder="e.g. juandelacruz@gmail.com"
            size="sm"
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

          <Input
            label="Phone Number"
            name="phone"
            placeholder="e.g. 09924401097"
            size="sm"
            type="text"
            value={values.phone}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage
            className="text-red-500 text-sm"
            component="div"
            name="phone"
          />

          <Input
            label="Address"
            name="address"
            placeholder="e.g. Makati City, Philippines"
            size="sm"
            type="text"
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage
            className="text-red-500 text-sm"
            component="div"
            name="address"
          />

          <Select
            label="Select Position"
            placeholder="Select Position"
            selectedKeys={[values.position]}
            onSelectionChange={(keys) =>
              setFieldValue("position", Array.from(keys).join(""))
            }
          >
            {position.map((position) => (
              <SelectItem key={position.key} value={position.key}>
                {position.label}
              </SelectItem>
            ))}
          </Select>
          <ErrorMessage
            className="text-red-500 text-sm"
            component="div"
            name="position"
          />

          <Input
            label="Resume"
            name="resume"
            size="lg"
            type={type}
            onChange={(event) =>
              setFieldValue("resume", event.currentTarget.files?.[0])
            }
          />
          <ErrorMessage
            className="text-red-500 text-sm"
            component="div"
            name="resume"
          />

          <Button color="primary" isDisabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CareerForm;
