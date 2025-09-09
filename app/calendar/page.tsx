"use client";

import { useState } from "react";
import Iframe from "react-iframe";

const calendars = {
  "CNUCDM 2029": "https://calendar.google.com/calendar/embed?src=cnucdm2029%40gmail.com&ctz=America%2FLos_Angeles",
  "ADEA": "https://calendar.google.com/calendar/embed?src=0a9869a58c86534363bd63287f2d73b06f61d4cc7e79a2f345bb0834bd380845%40group.calendar.google.com&ctz=America%2FLos_Angeles",
  "ASDA": "https://calendar.google.com/calendar/embed?src=0a9869a58c86534363bd63287f2d73b06f61d4cc7e79a2f345bb0834bd380845%40group.calendar.google.com&ctz=America%2FLos_Angeles",
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
