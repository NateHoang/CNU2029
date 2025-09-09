import Image from "next/image";
import ScrollTransition from "./scroll-transition";
import { FaInstagram, FaLink } from "react-icons/fa";

const Main = () => {
  return (
    <div>
      <div className="relative h-80 lg:h-[85vh]">
        <Image
          src="/homepage/drakesHeader.jpg"
          alt="Staff Cover Photo"
          fill
          quality={100}
          priority={true}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="relative z-10">
            <h1 className="text-4xl font-semibold mb-4 uppercase">
              CALIFORNIA NORTHSTATE UNIVERSITY - COLLEGE OF DENTAL MEDICINE
            </h1>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="w-full text-center bg-gray-100 py-8">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="my-8">
            <ScrollTransition>
              <h2 className="text-3xl font-bold font-raleway text-gray-900 uppercase">
                Welcome to CNUCDM 2029!
              </h2>
              <p className="text-raleway text-md lg:text-lg max-w-3xl mx-auto text-gray-600 mt-4 px-4">
                Welcome, CNUCDM Class of 2029! We are excited to have you in our community and look forward to building lasting friendships and memories together. Our goal is to help everyone feel connected and supported as we embark on this journey through dental school. Whether you’re looking for study buddies, new friends, or just a place to belong, you’ll find it here. Let’s make the most of our time together, support one another, and create a class that feels like family. Here’s to a great year ahead—let’s connect, grow, and succeed as one!
              </p>
              <p className="text-raleway text-md lg:text-lg max-w-3xl mx-auto text-gray-600 mt-4 px-4">
                To learn more about us, you can check out our upcoming events,
                meet our board members. Stay updated by following our
                Instagram, or by subscribing to our Mailing List!
              </p>
              <div className="flex justify-center space-x-6 mt-6">
                <a
                  href="https://www.instagram.com/cnucdm_2029/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-4xl text-gray-600 hover:text-gray-800 transition-colors duration-200" />
                </a>
              </div>
            </ScrollTransition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
