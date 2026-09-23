type Event = {
  title: string;
  group: string;
  dayOfWeek?: string;
  date?: string;
  time?: string;
  start?: string;
  end?: string;
  location?: string;
  form?: string;
  customTime?: string;
  pic?: string;
};

const events: Event[] = [
  {
    title: "D2 Sports Day",
    group: "D2",
    dayOfWeek: "Thursday",
    date: "2026-09-24",
    time: "05:00 PM - 08:00 PM",
    start: "05:00 PM",
    end: "08:00 PM",
    location: "2284 Pierce Arrow Ln, Sacramento, CA 95818",
    customTime: "",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSf1j26YlCP88dt2gDc9tXLFqFlUz3v6bF7v4SvU8-idHclIKA/viewform",
    pic: "/event_photos/d2/fall/fieldDay.jpg",
  },
  {
    title: "Kickball for Kids",
    group: "AAPD",
    dayOfWeek: "Sunday",
    date: "2026-10-04",
    time: "10:00 AM",
    start: "",
    end: "",
    customTime: "10:00 AM",
    location: "3349 W Curtis Dr, Sacramento, CA 95818",
    pic: "/event_photos/d2/fall/kickBall.png",
    form: "forms.gle/qrw8bTv4TsMG1PdX8",
  },
  {
    title: "Tiramisu For Tots",
    group: "AAPD",
    dayOfWeek: "Friday",
    date: "2026-10-02",
    time: "12:00 PM - 01:00 PM",
    start: "12:00 PM",
    end: "01:00 PM",
    customTime: "",
    location: "Student Lounge",
    pic: "/event_photos/d2/fall/tiramisu.png",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSdiiWeqH355noOLh1D6d9R8rI7K3Ko1Mml625blFMJCKeZeHw/viewform",
  },
  {
    title: "Pediatric Dentistry Shadow",
    group: "AAPD",
    dayOfWeek: "Thursday",
    date: "2026-10-01",
    pic: "/event_photos/d2/fall/ped.png",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSekT5u8THfaLKuBShgIvBKt5_0UM9aO9VdxRQPRl2p3-Ig_Sw/viewform",
  },
  {
    title: "Pediatric Practice Ownership",
    group: "AAPD",
    dayOfWeek: "Thursday",
    date: "2026-09-24",
    time: "12:00 PM - 01:00 PM",
    start: "12:00 PM",
    end: "01:00 PM",
    customTime: "",
    location: "Student Lounge",
    pic: "/event_photos/d2/fall/pedOwnership.png",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSdNs-Xn3-MbUHel2BT1aiw97SWUTdNraUfvaTy1BQraLGw2nw/viewform",
  },
];

export default events;
