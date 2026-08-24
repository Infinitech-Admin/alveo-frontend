"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
} from "@heroui/react";
import * as Yup from "yup";
import { ErrorMessage, Formik, Field, Form } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { LuCircleArrowRight, LuQuote } from "react-icons/lu";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  message: Yup.string().required("Message is required"),
});

const initialValues = {
  name: "",
  message: "",
};

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/submit-testimonial`,
        values,
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
          },
        },
      );

      if (response?.data) {
        resetForm();
        toast.success("Testimonial submitted successfully!");
        onSubmitted?.();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again!");
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      backdrop="blur"
      size="lg"
      classNames={{
        base: "border border-[#1B3A8C]/10",
        closeButton: "top-4 right-4",
      }}
    >
      <ModalContent>
        {(close) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#192D4D]/10 text-[#192D4D] mb-2">
                    <LuQuote size={20} />
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    Share your experience
                  </h2>
                  <p className="text-sm font-normal text-gray-500">
                    Tell us how it went — your words help the next person
                    decide.
                  </p>
                </ModalHeader>

                <ModalBody className="px-8 py-4">
                  <div className="space-y-4">
                    <div>
                      <Field name="name">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            isFullWidth
                            variant="bordered"
                            label="Full name"
                            placeholder="e.g., John Doe"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="text-red-500 text-xs mt-1"
                        component="div"
                        name="name"
                      />
                    </div>

                    <div>
                      <Field name="message">
                        {({ field }: any) => (
                          <Textarea
                            {...field}
                            isFullWidth
                            variant="bordered"
                            label="Your testimonial"
                            placeholder="Share your experience..."
                            minRows={4}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="text-red-500 text-xs mt-1"
                        component="div"
                        name="message"
                      />
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter className="px-8 pb-8">
                  <Button
                    variant="light"
                    onPress={close}
                    className="font-medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    endContent={
                      !isSubmitting && <LuCircleArrowRight size={18} />
                    }
                    className="bg-[#192D4D] text-white font-medium uppercase"
                  >
                    {isSubmitting ? "Submitting..." : "Submit testimonial"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TestimonialModal;