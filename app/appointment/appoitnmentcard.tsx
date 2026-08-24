"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from "@heroui/react";
import * as Yup from "yup";
import { ErrorMessage, Formik, Field, Form } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { getAuthHeaders } from "../auth";

// Appointment options
const viewing = [
  { key: 1, label: "Property Viewing", value: "Property Viewing" },
  { key: 2, label: "Property Consultation", value: "Property Consultation" },
];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  name: Yup.string().required("Full name is required"),
  type: Yup.string().required("Appointment type is required"),
  properties: Yup.string().required("Property name is required"),
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

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

const AppointmentCard = () => {
  const [properties, setProfile] = useState<any[]>([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";
      const endpoint = `${apiUrl}/api/user/properties`;
      try {
        const headers = getAuthHeaders();
        const response = await fetch(endpoint, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch testimonials: ${response.status} - ${response.statusText}`,
          );
        }

        const data = await response.json();
        setProfile(data.records);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const initialValues = {
    user_id: "01JC2KFCH3DFDVJTQ7S3MNDJEH",
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    type: "",
    properties: "",
    message: "",
    agreement: false,
    status: "Pending",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/request-viewing`,
        values,
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data) {
        resetForm();
        toast.success("Appointment submitted successfully!");
      }
    } catch (error) {
      toast.error("Error! Please Try Again!");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, resetForm }) => (
          <Card className="w-full order-1 md:order-2 col-span-2 py-6 px-2">
            <CardBody>
              <Form>
                <h1 className="font-bold uppercase text-sm mb-4 text-default-600">
                  Appointment Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <input name="message" type="hidden" value={"message"} />
                  <input name="status" type="hidden" value={"pending"} />

                  {/* Date */}
                  <div>
                    <Field name="date">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          isFullWidth
                          label="Select Date"
                          labelPlacement="inside"
                          type="date"
                          min={today}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="date"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <Field name="time">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          isFullWidth
                          label="Select Time"
                          labelPlacement="inside"
                          type="time"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="time"
                    />
                  </div>

                  {/* Appointment Type */}
                  <div>
                    <Field name="type">
                      {({ field }: any) => (
                        <Select
                          label="Appointment For"
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] || "";
                            setFieldValue("type", selected);
                          }}
                        >
                          {viewing.map((option, index) => (
                            <SelectItem key={option.label} value={option.label}>
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

                  {/* Property Name */}
                  <div>
                    <Field name="properties">
                      {({ field }: any) => (
                        <Select
                          label="Property"
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] || "";
                            setFieldValue("properties", selected);
                          }}
                        >
                          {properties
                            .filter((option) => option && option.name) // remove null/undefined entries or missing names
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((option) => (
                              <SelectItem key={option.name}>
                                {option.name}
                              </SelectItem>
                            ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="properties"
                    />
                  </div>
                </div>
                <Divider className="my-4" />

                <h1 className="font-bold uppercase text-sm mb-4 text-default-600">
                  Personal Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Full Name */}
                  <div className="col-span-2">
                    <Field name="name">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          isFullWidth
                          label="Full Name"
                          labelPlacement="inside"
                          placeholder="eg. Juan Dela Cruz"
                          type="text"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="name"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-2 md:col-span-1">
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          isFullWidth
                          label="Email"
                          labelPlacement="inside"
                          placeholder="eg. juandelacruz@gmail.com"
                          type="email"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="email"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="col-span-2 md:col-span-1">
                    <Field name="phone">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          isFullWidth
                          label="Phone Number"
                          labelPlacement="inside"
                          placeholder="eg. 09667269800"
                          type="text"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="phone"
                    />
                  </div>

                  <div className="col-span-2 overflow-hidden">
                    <Field name="message">
                      {({ field }: any) => (
                        <Textarea
                          {...field}
                          label="Description"
                          placeholder="Enter your description"
                          value={field.value || ""}
                        />
                      )}
                    </Field>

                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="message"
                    />
                  </div>

                  <div className="col-span-2">
                    <Field name="agreement" type="checkbox">
                      {({ field }: any) => (
                        <label className="flex items-center space-x-2">
                          <Checkbox
                            {...field}
                            isSelected={values.agreement}
                            id="agreement"
                          />
                          <span className="text-sm text-default-500">
                            By submitting your appointment request, you agree
                            that the information provided will be used solely
                            for the purpose of scheduling and managing your
                            appointment, as well as related communications.
                          </span>
                        </label>
                      )}
                    </Field>

                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="agreement"
                    />
                  </div>
                </div>

                {/* Checkbox */}

                {/* Buttons */}
                <div className="flex gap-2 mt-8">
                  <Button
                    size="lg"
                    color="primary"
                    type="button"
                    variant="bordered"
                    onPress={() => resetForm()}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="lg"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    className="min-w-0 truncate text-sm sm:text-base"
                  >
                    {isSubmitting
                      ? "Submitting Appointment..."
                      : "Submit Appointment"}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default AppointmentCard;
