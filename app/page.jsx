"use client";

import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

// components
import Hero from "@/components/Hero";
import EventList from "@/components/Events/EventList";
import UpcomingEvents from "@/components/UpcomingEvents";
import RecommendedEvents from "@/components/RecommendedEvents";
import DownloadApp from "@/components/DownloadApp";

const Home = () => {
  const { showEventList } = useContext(EventContext);

  return (
    <div className = "">
      <Hero />
      <div className = "flex flex-col justify-center items-center">
      </div>
      { showEventList ? (
        <div className = "container mx-auto">
          <EventList />
        </div>
      ) : (
        <div className = "">
          <div className = "container mx-auto">
            {/* Carrusel de próximos eventos */}
            <UpcomingEvents />
            {/* Sección de descarga de la app */}
            <DownloadApp />
            {/* Carrusel de eventos recomendados */}
            <RecommendedEvents />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home;