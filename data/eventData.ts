type Event = {
  title: string;
  group: string;
  dayOfWeek: string;
  date: string;
  time: string;
  start: string;
  end: string;
  location: string;
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
];

export default events;
