"use client";
import Link from "next/link";
import React from "react";
import { MdCalendarMonth, MdMail, MdPhone } from "react-icons/md";

const CompanyInfo = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-xl">
          You can also reach us via the following channels.
        </h1>
        <p className="text-default-500 text-sm">
          We always enjoy hearing from you and there are several ways that you can
          reach us.
        </p>
      </div>


      <div className="flex gap-3 pt-8">
        <div className="bg-green-200 inline-flex">
          <MdPhone size={32} className="mt-2" />
        </div>

        <div className="">
          <h1 className="font-bold text-xl">Phone</h1>
          <p className="text-sm text-default-500 mb-4">
            Our phone lines are availble every <strong>Monday to Friday</strong>{" "}
            from 8AM to 5PM.
          </p>
          <p className="text-md">
            <Link href={'tel: 09622530149'}>
              <strong className="text-default-500">Mobile:</strong>
              09622530149
            </Link>
          </p>
          <p className="text-md">
            <strong className="text-default-500">Telephone:</strong>
            <a href="tel:(02)7001-6157">(02)7001-6157</a>
          </p>
          {/* <p className="text-sm">
            <strong className="text-default-500">Employment Inquiry:</strong>
            <a href="tel:+63 (2) 85557777">+63 (2) 85557777</a>
          </p>
          <p className="text-sm">
            <strong className="text-default-500">Customer Care (SMART):</strong>
            <a href="tel:(+63) 918 9183456">(+63) 918 9183456</a>
          </p>
          <p className="text-sm">
            <strong className="text-default-500">Customer Care (GLOBE):</strong>
            <a href="tel:(+63) 917 8115268">(+63) 917 8115268</a>
          </p>
          <p className="text-sm">
            <strong className="text-default-500">Other Inquiries:</strong>
            <a href="tel:+63 (2) 85557777">+63 (2) 85557777</a>
          </p> */}
        </div>
      </div>

      <div className="flex gap-3 pt-8">
        <MdMail size={48} />
        <div className="inline-block">
          <h1 className="font-bold text-xl">Email</h1>
          {/* <p className="text-sm text-default-500 mb-4">
            You may reach us by email for all manner of information. Send an
            enquiry to the following designated email list.
          </p> */}
          <p className="text-sm">
            {/* <strong className="text-default-500">Sales:</strong> */}
            <a href="mailto:sales@dmcihomes.com">sales@dmcihomes.com</a>
          </p>
          {/* <p className="text-sm">
            <strong className="text-default-500">Leasing:</strong>
            <a href="mailto: leasing@dmcihomes.com"> leasing@dmcihomes.com</a>
          </p>
          <p className="text-sm">
            <strong className="text-default-500">Customer Care:</strong>
            <a href="mailto:customercare@dmcihomes.com">
              customercare@dmcihomes.com
            </a>
          </p>
          <p className="text-sm">
            <strong className="text-default-500">Employment Inquiry:</strong>
            <a href="mailto:careers@dmcihomes.com">careers@dmcihomes.com</a>
          </p> */}
        </div>
      </div>

      <div className="flex gap-3 pt-8">
        <MdCalendarMonth size={48} />
        <div className="inline-block">
          <h1 className="font-bold text-xl">Set Appointment</h1>
          <p className="text-sm text-default-500 mb-4">
            Avoid the long queues, book your next visit to our customer helpdesk
            at book.dmcihomes.com
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
