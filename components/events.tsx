"use client";

import { useEffect, useState } from "react";
import FadeInTransition from "./scroll-transition";
import events from "../data/eventData";

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

const groupOrder = ["D2", "ADEA", "ASDA", "AAPD", "CDA", "DSD"];

const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates a date-only string without allowing JavaScript
 * to normalize invalid dates such as February 30.
 */
const parseDateOnly = (value: string): Date | null => {
  if (!dateOnlyPattern.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
};

/**
 * Formats YYYY-MM-DD without shifting it to another date.
 */
const formatDate = (value: string): string => {
  const date = parseDateOnly(value);

  if (!date) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

/**
 * Formats either a date-only string or a full date-time string.
 */
const formatDateTime = (value: string): string => {
  if (dateOnlyPattern.test(value)) {
    return formatDate(value);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  }).format(date);
};

/**
 * Returns midnight Pacific time at the beginning of the day
 * after a YYYY-MM-DD date.
 *
 * This makes a date-only end date inclusive: an event ending
 * December 11 remains visible through December 11.
 */
const getPacificDayAfter = (value: string): Date | null => {
  const date = parseDateOnly(value);

  if (!date) {
    return null;
  }

  date.setUTCDate(date.getUTCDate() + 1);

  const target = date.getTime();
  let result = target;

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  // Adjust for the Pacific offset, including daylight saving time.
  for (let i = 0; i < 3; i++) {
    const parts = formatter.formatToParts(new Date(result));

    const getPart = (type: Intl.DateTimeFormatPartTypes): number => {
      return Number(parts.find((part) => part.type === type)?.value);
    };

    const displayedAsUtc = Date.UTC(
      getPart("year"),
      getPart("month") - 1,
      getPart("day"),
      getPart("hour"),
      getPart("minute"),
      getPart("second"),
    );

    const adjustment = target - displayedAsUtc;
    result += adjustment;

    if (adjustment === 0) {
      break;
    }
  }

  return new Date(result);
};

const hasFullAddress = (location: string): boolean => {
  return location.includes(",");
};

/**
 * Determines when an event should be removed.
 *
 * Full end date and time:
 *   end: "2027-12-11T15:00:00-08:00"
 *
 * Date-only end, inclusive through the end of that Pacific day:
 *   end: "2027-12-11"
 *
 * Legacy events:
 *   date: "2027-12-11"
 *   time: "9:00 AM - 3:00 PM"
 *
 * Legacy date/time values are interpreted in the visitor's local
 * time zone. If a legacy event has no time range, it remains
 * visible until the end of its date.
 */
const getEventEndDate = (event: Event): Date | null => {
  if (event.end) {
    if (dateOnlyPattern.test(event.end)) {
      return getPacificDayAfter(event.end);
    }

    const endDate = new Date(event.end);

    return Number.isNaN(endDate.getTime()) ? null : endDate;
  }

  // Fall back to the legacy date field if there is no end field.
  if (!event.date) {
    return null;
  }

  const parsedDate = parseDateOnly(event.date);

  if (!parsedDate) {
    return null;
  }

  const year = parsedDate.getUTCFullYear();
  const month = parsedDate.getUTCMonth();
  const day = parsedDate.getUTCDate();

  // Legacy dates and times use the visitor's local time zone.
  const eventEndDate = new Date(year, month, day);

  // Only treat the time as an end time when it is a range.
  // A single time such as "6:00 PM" is usually the start time.
  const timeParts = event.time?.split("-");

  const endTime =
    timeParts && timeParts.length > 1
      ? timeParts[timeParts.length - 1].trim()
      : undefined;

  const timeMatch = endTime?.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);

  if (!timeMatch) {
    eventEndDate.setHours(23, 59, 59, 999);
    return eventEndDate;
  }

  let hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2] ?? 0);
  const period = timeMatch[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes > 59) {
    eventEndDate.setHours(23, 59, 59, 999);
    return eventEndDate;
  }

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  eventEndDate.setHours(hours, minutes, 0, 0);

  return eventEndDate;
};

const EventDateAndTime = ({ event }: { event: Event }) => {
  return (
    <>
      {event.start ? (
        <p className="mb-2 text-gray-600">
          <strong>Starts: </strong>
          {formatDateTime(event.start)}
          {!dateOnlyPattern.test(event.start) && " PT"}
        </p>
      ) : (
        <>
          {event.date && (
            <p className="mb-2 text-gray-600">
              <strong>Date: </strong>
              {formatDate(event.date)}
            </p>
          )}

          {event.time && (
            <p className="mb-2 text-gray-600">
              <strong>Time: </strong>
              {event.customTime || event.time}
            </p>
          )}
        </>
      )}

      {event.end && (
        <p className="mb-2 text-gray-600">
          <strong>Ends: </strong>
          {formatDateTime(event.end)}
          {!dateOnlyPattern.test(event.end) && " PT"}
        </p>
      )}
    </>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const refreshTime = () => setNow(Date.now());

    // Set the time after mounting to avoid hydration mismatches.
    refreshTime();

    // Refresh if the user returns to the browser tab.
    window.addEventListener("focus", refreshTime);
    document.addEventListener("visibilitychange", refreshTime);

    return () => {
      window.removeEventListener("focus", refreshTime);
      document.removeEventListener("visibilitychange", refreshTime);
    };
  }, []);

  useEffect(() => {
    if (now === null) {
      return;
    }

    const nextEnd = events
      .map((event) => getEventEndDate(event)?.getTime())
      .filter((time): time is number => time !== undefined && time > now)
      .sort((a, b) => a - b)[0];

    if (nextEnd === undefined) {
      return;
    }

    // Browsers limit a single timeout to approximately 24.8 days.
    const maxTimeout = 2_147_483_647;
    const delay = Math.min(Math.max(0, nextEnd - Date.now()), maxTimeout);

    const timer = window.setTimeout(() => {
      setNow(Date.now());
    }, delay);

    return () => window.clearTimeout(timer);
  }, [now]);

  const upcomingEvents = events.filter((event) => {
    const endDate = getEventEndDate(event);

    // Events with no valid end date remain visible.
    return now === null || !endDate || endDate.getTime() > now;
  });

  const groupedEvents = groupOrder.map((group) => ({
    group,
    events: upcomingEvents.filter((event) => event.group === group),
  }));

  const selectedEndDate = selectedEvent ? getEventEndDate(selectedEvent) : null;

  // Hide the modal if the selected event ends while it is open.
  const showSelectedEvent =
    selectedEvent &&
    (now === null || !selectedEndDate || selectedEndDate.getTime() > now);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInTransition>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Upcoming Events
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="w-72">
              <div className="mb-4 rounded-lg bg-white p-4 shadow">
                <p className="text-lg text-gray-600">
                  No events yet, check back soon!
                </p>
              </div>
            </div>
          ) : (
            groupedEvents.map(
              ({ group, events: groupEvents }) =>
                groupEvents.length > 0 && (
                  <div key={group} className="mb-8">
                    <h3 className="mb-4 text-2xl font-semibold">{group}</h3>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {groupEvents.map((event, index) => (
                        <button
                          key={`${event.title}-${event.start ?? event.date ?? index}`}
                          type="button"
                          className="w-full text-left"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="rounded-lg bg-white p-4 shadow transition hover:shadow-lg">
                            <h3 className="mb-2 text-xl font-bold">
                              {event.title}
                            </h3>

                            <EventDateAndTime event={event} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ),
            )
          )}
        </FadeInTransition>
      </div>

      {showSelectedEvent && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedEvent.title}
            className="relative mx-4 max-h-screen w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
            >
              ✕
            </button>

            <h3 className="mb-4 text-2xl font-bold">{selectedEvent.title}</h3>

            {selectedEvent.pic && (
              <img
                src={selectedEvent.pic}
                alt={selectedEvent.title}
                className="mb-4 w-full rounded-lg"
              />
            )}

            <EventDateAndTime event={selectedEvent} />

            {selectedEvent.location && (
              <p className="text-gray-600">
                <strong>Location: </strong>

                {selectedEvent.location === "TBA" ? (
                  "TBA"
                ) : hasFullAddress(selectedEvent.location) ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedEvent.location,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedEvent.location}
                  </a>
                ) : (
                  selectedEvent.location
                )}
              </p>
            )}

            {selectedEvent.form && selectedEvent.form.trim() !== "" && (
              <p className="mt-2 text-gray-600">
                <strong>Form: </strong>
                <a
                  href={selectedEvent.form}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Click here for the form
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
