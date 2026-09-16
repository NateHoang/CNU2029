"use client";

import { useState } from "react";
import FadeInTransition from "./scroll-transition";
import events from "../data/eventData";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const groupOrder = ["D2", "ADEA", "ASDA", "AAPD", "CDA", "DSD"];

  const formatDate = (date: string) => {
    const eventDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };

    return eventDate.toLocaleDateString("en-US", options);
  };

  const hasFullAddress = (location: string) => {
    return location.includes(",");
  };

  /**
   * Returns the date and time at which an event ends.
   *
   * Supported time format:
   * "9:00 AM - 3:00 PM"
   *
   * An optional `endDate` property can be added to eventData for
   * events that end on a different day.
   */
  const getEventEndDate = (event: any) => {
    const date = event.endDate ?? event.date;

    // Parse manually so YYYY-MM-DD is treated as local time instead of UTC.
    const [year, month, day] = date.split("-").map(Number);
    const eventEndDate = new Date(year, month - 1, day);

    // Extract the last time from a range such as:
    // "9:00 AM - 3:00 PM"
    const endTime = event.time?.split("-").pop()?.trim();

    const timeMatch = endTime?.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);

    if (!timeMatch) {
      // If no valid end time exists, keep the event visible
      // until the end of its event date.
      eventEndDate.setHours(23, 59, 59, 999);
      return eventEndDate;
    }

    let hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2] ?? 0);
    const period = timeMatch[3].toUpperCase();

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    eventEndDate.setHours(hours, minutes, 0, 0);

    return eventEndDate;
  };

  const now = new Date();

  const upcomingEvents = events.filter(
    (event) => getEventEndDate(event) >= now,
  );

  const groupedEvents = groupOrder.map((group) => ({
    group,
    events: upcomingEvents.filter((event) => event.group === group),
  }));

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
              ({ group, events }) =>
                events.length > 0 && (
                  <div key={group} className="mb-8">
                    <h3 className="mb-4 text-2xl font-semibold">{group}</h3>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {events.map((event) => (
                        <div
                          key={event.title}
                          className="w-full cursor-pointer"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="rounded-lg bg-white p-4 shadow transition hover:shadow-lg">
                            <h3 className="mb-2 text-xl font-bold">
                              {event.title}
                            </h3>

                            {event.date && (
                              <p className="mb-2 text-gray-600">
                                <strong>Date: </strong>
                                {formatDate(event.date)}
                              </p>
                            )}

                            {event.time && (
                              <p className="mb-2 text-gray-600">
                                <strong>Time: </strong>
                                {event.customTime === "" ? (
                                  <span>{event.time} PST</span>
                                ) : (
                                  event.customTime
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )
          )}
        </FadeInTransition>
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative mx-4 max-h-screen w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <button
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

            {selectedEvent.date && (
              <p className="mb-2 text-gray-600">
                <strong>Date: </strong>
                {formatDate(selectedEvent.date)}
              </p>
            )}

            {selectedEvent.time && (
              <p className="mb-2 text-gray-600">
                <strong>Time: </strong>
                {selectedEvent.time}
              </p>
            )}

            {selectedEvent.location && (
              <p className="text-gray-600">
                <strong>Location:</strong>{" "}
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
                    onClick={(event) => event.stopPropagation()}
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
                  onClick={(event) => event.stopPropagation()}
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
