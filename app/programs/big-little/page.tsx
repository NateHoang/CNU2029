"use client";

import NavBar from "@/app/_components/navbar";
import Header from "@/app/_components/header";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/_components/footer";

const BigLittle = () => {
  const events = [
    {
      name: "Virtual Speed Dating",
      description: "Join us for Virtual Speed Dating!",
      date: "2023-08-25",
      location: "Zoom",
    },
    {
      name: "In Person Speed Dating",
      description: "Come out to Lot 22 to meet your potential big/little!",
      date: "2023-09-10",
      location: "Lot 22 top floor",
    },
    {
      name: "Boba Mixer",
      description: "Join us for a night of boba and fun!",
      date: "2023-10-05",
      location: "TBD",
    },
    {
      name: "Beach Day",
      description: "Come out to the beach with us for a day of sun and fun!",
      date: "2023-11-20",
      location: "TBD",
    },
    {
      name: "Art and Game Night",
      description:
        "Enjoy a night of arts and crafts and games! Last chance to meet your potential big/little!",
      date: "2023-12-15",
      location: "TBD",
    },
  ];

  const pickupPhotos = [
    {
      src: "/programs/pickup_1.jpg",
      alt: "Big Little Pickup 1",
    },
    {
      src: "/programs/pickup_2.jpg",
      alt: "Big Little Pickup 2",
    },
    {
      src: "/programs/pickup_3.jpg",
      alt: "Big Little Pickup 3",
    },
    {
      src: "/programs/pickup_4.jpg",
      alt: "Big Little Pickup 4",
    },
    {
      src: "/programs/pickup_5.jpg",
      alt: "Big Little Pickup 5",
    },
    {
      src: "/programs/pickup_6.jpg",
      alt: "Big Little Pickup 6",
    },
    {
      src: "/programs/pickup_7.jpg",
      alt: "Big Little Pickup 7",
    },
    {
      src: "/programs/pickup_8.jpg",
      alt: "Big Little Pickup 8",
    },
  ];

  return (
    <div>
      <Header title="UCSB TASA"></Header>
      <NavBar></NavBar>
      <div className="relative h-80 lg:h-[85vh]">
        <Image
          src="/programs/big_little.jpg"
          alt="Big Little Photo"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="relative z-10">
            <h1 className="text-4xl font-semibold mb-4">BIG LITTLE PROGRAM</h1>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="mx-4 lg:mx-16 pt-16">
        <div className="p-8 mb-8 flex flex-col md:flex-row">
          <div className="md:w-[60%] md:pr-4">
            <h2 className="text-3xl font-bold mb-4">WHAT IS BIG-LITTLE?</h2>
            <p className="text-gray-700">
              The Big-Little Program is a mentorship program and one of TASA's
              most memorable aspects for students and alumni.
            </p>
            <br />
            <p className="text-gray-700">
              It's one of the first and easiest ways to make lifelong friends
              and be a part of TASA culture. During 2-3 weeks every fall, our
              recruitment team hosts multiple social events for you to meet the
              perfect mentor or mentee (we usually call them bigs or littles,
              respectively). After, bigs and littles submit forms ranking their
              preferences for who they want to be with, and pairings are
              announced at reveal.
            </p>
            <br />
            <p className="text-gray-700">
              Through meeting a big, one meets their "family", an intertwined
              group of TASA members all somehow connected through the big-little
              program. Families are often the closest group of friends one will
              encounter during their college years.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center md:w-[40%] md:pl-4 mt-4">
            <span className="table">
              <Link
                href={"https://photos.app.goo.gl/jg1EmfXvCc2yVdWL6"}
                target="_"
              >
                <Image
                  src="/programs/pickup.JPG"
                  alt="Pickup Photo 1"
                  width={400}
                  height={400}
                />
                <p>Big-Little Reveal 2022 (click for full album)</p>
              </Link>
            </span>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-md p-8 m-8">
          <h1 className="text-4xl uppercase">2023-2024 PICKUP TIMELINE</h1>
          <p className="text-gray-500">
            *Dates subject to change & all event times are in <b>PST</b> <br />
            To guarantee a chance of being picked up/picking up, we ask that you
            attend <b>three</b> of the five main events <b>at minimum</b>.
            <br />
            ​In addition, please make an effort to reach out to potentials in
            your own time!{" "}
          </p>
          <div className=" p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-semibold mb-4">Event Timeline</h1>
              <div className="flex flex-col space-y-8">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 border-l-4 pl-4 border-black transition-colors hover:bg-gray-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {event.name}
                      </h2>
                      <p className="text-gray-500">
                        {event.date} - {event.location}
                      </p>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 lg:mx-16">
        <div className="p-8 mb-8">
          <h1 className="text-4xl">Big Little Pickup 2022 Highlights</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {pickupPhotos.map((photo, index) => (
              <Link
                key={index}
                href={"https://photos.app.goo.gl/jg1EmfXvCc2yVdWL6"}
                target="_"
              >
                <div className="group relative cursor-pointer">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className="transition transform group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default BigLittle;
