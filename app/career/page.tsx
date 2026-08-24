"use client";
import {Card, CardBody,Link,} from "@heroui/react";

import { Toaster, toast } from "react-hot-toast";
import { LuFileUser, LuMail, LuPhone  } from "react-icons/lu";
import { FaFacebook, FaSquareInstagram, FaTelegram, FaViber, FaWhatsapp,FaWeixin,FaMobileScreenButton   } from "react-icons/fa6";
import CareerForm from "./careerform";


const CareerPage = () => {

  return (
    <section className="container mx-auto flex-grow max-w-7xl px-2 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="col-span-2 px-2">
          <h1 className="text-2xl font-bold text-green-600 uppercase md:text-4xl">Apply Now!</h1>
          <p className="text-default-500 max-w-xl">
            Join our team and take the next step in your career! Fill out the form and submit your application.
            We look forward to having you on board.
          </p>

          <div className="py-8">
            <h1 className="font-medium capitalize">Get in touch:</h1>
            <div className="flex flex-col gap-2 py-2">
              <div className="flex items-center gap-2">
                <div className="bg-green-200 py-2 px-2 rounded-lg">
                  <LuMail className="text-green-800" size={18} />
                </div>
                :
                <Link href="mailto:elladmcihomes.ph@gmail.com">elladmcihomes.ph@gmail.com</Link>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-200 py-2 px-2 rounded-lg">
                  <FaMobileScreenButton  className="text-green-800" size={18} />
                </div>
                :
                <Link href="tel:09175480999">(+63) 9175 480 999</Link>
              </div>
            </div>
            <div className="py-4">
              <h1 className="font-medium capitalize">for other concerns:</h1>

              <div className="flex gap-2 py-2">
                <Link href={'https://www.facebook.com/share/We79XYCKWCDWmhE2/?mibextid=JRoKGi'} target="_blank">
                  <div className="bg-green-200 py-2 px-2 rounded-lg">
                    <FaFacebook className="text-green-700" size={20} />
                  </div>
                </Link>

                <Link href={'https://www.instagram.com/ella.dmcihomes?igsh=MXdkOGhlcXJ6ZXJoaw%3D%3D&utm_source=qr'} target="_blank">
                  <div className="bg-green-200 py-2 px-2 rounded-lg">
                    <FaSquareInstagram className="text-green-700" size={20} />
                  </div>
                </Link>
                <Link href={'https://t.me/+639175480999'} target="_blank">
                  <div className="bg-green-200 py-2 px-2 rounded-lg">
                    <FaTelegram className="text-green-700" size={20} />
                  </div>
                </Link>
                <Link href={'viber://chat?number=639175480999'}>
                  <div className="bg-green-200 py-2 px-2 rounded-lg">
                    <FaViber className="text-green-700" size={20} />
                  </div>
                </Link>
                <Link href="https://wa.me/639175480999" rel="noopener noreferrer">
                  <div className="bg-green-200 p-2 rounded-lg flex items-center justify-center">
                    <FaWhatsapp className="text-green-700" size={20} />
                  </div>
                </Link>
                <Link href="weixin://dl/chat?number=639175480999" rel="noopener noreferrer">
                <div className="bg-green-200 p-2 rounded-lg flex items-center justify-center">
                  <FaWeixin className="text-green-700" size={20} />
                </div>
              </Link>
      

              </div>
            </div>

          </div>
        </div>

        <div className="col-span-3 md:col-span-1 w-full">
          <Card className="w-full">
            <CardBody className="py-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-200 py-2 px-2 rounded-full">
                    <LuFileUser className="text-green-700" size={32} />
                </div>

                <div>
                    <h1 className="uppercase font-bold text-lg text-green-700">Application Form</h1>
                    <p className="text-gray-600 text-sm leading-3">Please fill out the form below to apply.</p>
                </div>
            </div>
              <CareerForm />
            </CardBody>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default CareerPage;
