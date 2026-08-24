import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site"}/api/user/subscribe`,
        { email },
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
          },
        },
      );

      const emailAgentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site"}/api/email/subscribe/agent`,
        {
          sender_email: email,
        },
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
            Accept: "application/json",
          },
        },
      );

      if (response?.data && emailAgentResponse?.data) {
        setEmail("");
        toast.success("Subscribe successfully!");
      }
    } catch (error) {
      toast.error("Your email is already subscribed.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-span-1 bg-default-50 rounded-lg p-6">
      <h2 className="font-bold text-xl text-black mb-4 dark:text-white">
        Subscribe to Updates
      </h2>
      <p className="text-sm mb-4 text-default-500">
        Stay updated with the latest property listings and insights from Ella.
        Enter your email below to subscribe to our newsletter.
      </p>
      <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
        <Input
          size="lg"
          required
          className="w-full md:w-3/4"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button size="lg" color="primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default SubscribeForm;
