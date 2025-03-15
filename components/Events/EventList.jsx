import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import Event from "./Event";
import SkeletonGrid from "../SkeletonGrid";
import Link from "next/link";

const EventList = () => {
    const { filteredEvents, isLoading, error } = useContext(EventContext);
    if (error) return <p>Error: {error.message}</p>; // Mensaje de error

    if (filteredEvents.length === 0 && !isLoading) {
        return (
            <div className = "h-[80vh]">
                <p className = "text-white/80 text-center">No hay eventos disponibles</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <SkeletonGrid itemCount = {12} />
        )
    } else {
        return (
            <div className = "">
                <h4 className = "h4 mb-6">
                    {filteredEvents.length} resultado(s) encontrados
                </h4>
                <div className = "grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-32">
                    {filteredEvents.map((event, index) => {
                        return (
                            <div key = {index} className = "">
                                <Link href = {`/event/${event.id}`}>
                                    <Event event = {event} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default EventList;