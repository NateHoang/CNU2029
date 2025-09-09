"use client";

import { useState } from "react";
import Iframe from "react-iframe";

const calendars = {
  "CNUCDM 2029": "https://calendar.google.com/calendar/embed?src=cnucdm2029%40gmail.com&ctz=America%2FLos_Angeles",
  "ADEA": "https://calendar.google.com/calendar/embed?src=37a82b51382561aa4b4c5d7b97a3dbb0578a27b8521b9fb196bd1fdcaea8fb5c%40group.calendar.google.com&ctz=America%2FLos_Angeles",
  "ASDA": "https://calendar.google.com/calendar/embed?src=29a39d539f4fc03b3a3987051fa8bc6ef18056d2855cf211190332044fc3e4f8%40group.calendar.google.com&ctz=America%2FLos_Angeles",
  "CDA": "https://calendar.google.com/calendar/embed?src=76f8fbe1f9aefd4068a1f0b3f52a454e7bd4214655143a0dcf7aee6a627c665d%40group.calendar.google.com&ctz=America%2FLos_Angeles",
  "DSD": "https://calendar.google.com/calendar/embed?src=5c1f86ab8861c898dd5fe8f041fe31eef052f632326568d7c211f4397da55449%40group.calendar.google.com&ctz=America%2FLos_Angeles",
};

const calendarNames = Object.keys(calendars) as (keyof typeof calendars)[];
const Page = () => {
  const [selected, setSelected] = useState<keyof typeof calendars>("CNUCDM 2029");

  return (
    <div className="bg-gray-100">
      <div className="text-center justify-center mx-4 lg:mx-16 pt-4">
        <h1>Upcoming Events!</h1>

        {/* Dropdown menu */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as keyof typeof calendars)}
          className="mb-4 p-2 border rounded"
        >
          {Object.keys(calendars).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Dynamic calendar iframe */}
        <div className="flex justify-center">
          <Iframe
            url={calendars[selected]}
            width="800"
            height="800"
            className="mb-8 border border-[#777]"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
