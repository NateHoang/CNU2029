"use client";

import { useState } from "react";
import FadeInTransition from "./scroll-transition";
import events from "../data/eventData";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

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

  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() - 1);

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= futureDate
  );

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInTransition>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="w-72">
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <p className="text-lg text-gray-600">
                  No events yet, check back soon!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="w-full cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Date: </strong> {formatDate(event.date)}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Time: </strong>
                      {event.customTime === "" ? (
                        <span>{event.time} PST</span>
                      ) : (
                        event.customTime
                      )}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </FadeInTransition>
      </div>
{/* Modal OUTSIDE the container */}
{selectedEvent && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
    onClick={() => setSelectedEvent(null)} // close when clicking backdrop
  >
    <div
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 relative"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setSelectedEvent(null)}
      >
        ✕
      </button>
      <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
      <img
        src={selectedEvent.pic}
        alt={selectedEvent.title}
        className="rounded-lg mb-4 w-full"
      />
      <p className="text-gray-600 mb-2">
        <strong>Date: </strong> {formatDate(selectedEvent.date)}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Time: </strong> {selectedEvent.time}
      </p>
      <p className="text-gray-600">
        <strong>Location:</strong> {selectedEvent.location}
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default Events;
