"use client";

import React, { useContext, useEffect, useState } from "react";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { EventContext } from "@/contexts/EventContext";

// components
import Event from "./Events/Event";
import Image from "next/image";
import Link from "next/link";
import SkeletonGrid from "./SkeletonGrid";

const UpcomingEvents = () => {
    const { events } = useContext(EventContext);
    const [ eventValue, setEventValue ] = useState("todo");
    const [ filteredEvents, setFilteredEvents ] = useState([]);

    useEffect(() => {
        const filterEvents = () => {
            if (eventValue === "todo") {
                setFilteredEvents(events);
            } else {
                const result = events.filter((event) => event.type === eventValue);
                setFilteredEvents(result);
            }
        }
        filterEvents();
    }, [eventValue, events]);

    return (
        <section className = "mb-16">
            <div className = "mb-12 text-center">
                <h3 className = "pretitle">
                    Próximamente
                </h3>
                <h2 className = "h2">
                    Eventos populares
                </h2>
            </div>
            <div className = "flex flex-col xl:flex-row items-center justify-between mb-12">
                <Tabs value = {eventValue} onValueChange = {setEventValue} className = "bg-none w-full max-w-[600px] h-full flex justify-center items-center mb-12 xl:mb-0">
                    <TabsList className = "flex flex-col lg:flex-row gap-6 bg-transparent w-full h-full">
                        <TabsTrigger value = "todo">
                            Todo
                        </TabsTrigger>
                        <TabsTrigger value = "deporte">
                            <Image src = {"/assets/upcoming/sport.svg"} width = {18} height = {18} alt = "" /> Deporte
                        </TabsTrigger>
                        <TabsTrigger value = "música">
                            <Image src = {"/assets/upcoming/music.svg"} width = {18} height = {18} alt = "" /> Música
                        </TabsTrigger>
                        <TabsTrigger value = "comida">
                            <Image src = {"/assets/upcoming/food.svg"} width = {18} height = {18} alt = "" /> Comida
                        </TabsTrigger>
                        <TabsTrigger value = "arte">
                            <Image src = {"/assets/upcoming/art.svg"} width = {18} height = {18} alt = "" /> Arte
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <Link href = {"/"} className = "uppercase border-b-2 border-accent text-sm font-semibold text-accent">
                    Ver todos los eventos
                </Link>
            </div>
            {/* slider */}
            {filteredEvents.length > 0 ? (
                <Swiper slidesPerView = {1} spaceBetween = {30} pagination = {{ dynamicBullets: true, clickable: true }} breakpoints = {{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1310: { slidesPerView: 4 } }} modules = {[Pagination]} className = "w-full h-[500px]">
                    {filteredEvents.map((event, index) => (
                        <SwiperSlide key = {index} className = "select-none">
                            <Link href = {`/event/${event.id}`}>
                                <Event event = {event} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <SkeletonGrid itemCount = {4} />
            )}
        </section>
    )
}

export default UpcomingEvents;