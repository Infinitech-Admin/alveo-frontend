"use client";
import React from "react";
import { Card, CardBody, Divider, Button, Input } from "@heroui/react";
import * as Yup from "yup";
import { ErrorMessage, Formik, Field, Form } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Fullname is required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  unit_name: Yup.string().required("Property Name is required"),
  unit_location: Yup.string().required("Property Location is required"),
  unit_type: Yup.string().required("Unit Type is required"),
  unit_price: Yup.number().required("Unit Price is required"),
  images: Yup.mixed().required("Please upload at least one image"),
});

const SubmitForm = () => {
  const initialValues = {
    user_id: process.env.NEXT_PUBLIC_API_USER_ID,
    name: "",
    email: "",
    phone: "",
    unit_name: "",
    unit_type: "",
    unit_location: "",
    unit_price: "",
    status: "Pending",
    images: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm, setFieldValue }: any,
  ) => {
    try {
      const formData = new FormData();

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";
      const endpoint = `${apiUrl}/api/user/submit-property`;

      Object.entries(values).forEach(([key, value]: [string, unknown]) => {
        if (key === "images" && value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append("images[]", file);
          });
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, value.toString());
        }
      });

      const response = await axios.post(endpoint, formData, {
        headers: {
          "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data) {
        resetForm();
        setFieldValue("images", null);
        toast.success("Property Submitted Successfully!");
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
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
        {({ setFieldValue, isSubmitting }) => (
          <Card className="w-full col-span-2 py-8 px-2 order-1 md:px-6 md:order-2">
            <Form>
              <CardBody>
                <h1 className="font-bold uppercase text-sm mb-4 text-default-600">
                  Personal Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="col-span-2">
                    <Field name="name">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          className="w-full col-span-2"
                          label="Full Name"
                          labelPlacement="inside"
                          placeholder="e.g., Juan Dela Cruz"
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
                  <div className="col-span-2 md:col-span-1">
                    <Field name="phone">
                      {({ field }: any) => (
                        <Input
                        {...field}
                        label="Phone Number"
                        labelPlacement="inside"
                        placeholder="e.g., 09924401067"
                        type="text"
                        maxLength={11} 
                    
                      />
                      
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="phone"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          label="Email"
                          labelPlacement="inside"
                          placeholder="e.g., juandelacruz@gmail.com"
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
                </div>

                <Divider className="my-4" />

                <h1 className="font-bold uppercase text-sm mb-4 text-default-600">
                  Property Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <Field name="unit_name">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          className="w-full col-span-1"
                          label="Property Name"
                          labelPlacement="inside"
                          placeholder="e.g., Sonora Garden Residences"
                          type="text"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="unit_name"
                    />
                  </div>
                  <div>
                    <Field name="unit_type">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          className="w-full col-span-1"
                          label="Unit/PS Type"
                          labelPlacement="inside"
                          placeholder="e.g., 1 Bedroom"
                          type="text"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="unit_type"
                    />
                  </div>
                  <div>
                    <Field name="unit_location">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          className="w-full col-span-1"
                          label="Unit Location"
                          labelPlacement="inside"
                          placeholder="e.g., Makati City, Philippines"
                          type="text"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="unit_location"
                    />
                  </div>
                  <div>
                    <Field name="unit_price">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          className="w-full col-span-1"
                          label="Unit Price"
                          labelPlacement="inside"
                          placeholder="e.g., ₱0.00"
                          type="number"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component="div"
                      name="unit_price"
                    />
                  </div>
                </div>

                <Divider className="my-4" />

                <h1 className="font-bold uppercase text-sm mb-4 text-default-600">
                  Property Image
                </h1>
                <div>
                  <Input
                    multiple
                    accept="image/*"
                    className="w-full col-span-1"
                    label="Upload Image"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.currentTarget.files;

                      if (files) {
                        setFieldValue("images", files);
                      }
                    }}
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component="div"
                    name="images"
                  />
                </div>

                <div className="flex gap-2 mt-8">
                  <Button color="primary" type="reset" variant="bordered">
                    Cancel
                  </Button>
                  <Button color="primary" disabled={isSubmitting} type="submit">
                    {isSubmitting
                      ? "Submitting Property..."
                      : "Submit Property"}
                  </Button>
                </div>
              </CardBody>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default SubmitForm;
