import React from "react";

// components
import Image from "next/image";
import EventSchedule from "@/components/EventSchedule";
import Timer from "@/components/Timer";
import CustomSelect from "@/components/CustomSelect";
import BuyTicket from "@/components/BuyTicket";
import Requirements from "@/components/Requirements";
import Organizers from "@/components/Organizers";
import { FaRegCircleCheck } from "react-icons/fa6"

const EventDetails = async ({ params }) => {
    const { id } = await params;

    // Fetch event según el id
    const fetchEvent = async (id) => {
        const res = await fetch(`https://events-api-9lfc.onrender.com/events/${id}`);
        if (!res.ok) throw new Error("Error al obtener el evento");
        return res.json();
    };

    const event = await fetchEvent(id);

    return (
        <section className = "min-h-screen flex items-center py-8 sm:py-48">
            <div className = "container mx-auto">
                <div className = "w-full max-w-[600px] xl:max-w-none mx-auto">
                    {/* Event details 1 */}
                    <div className = "flex flex-col gap-8 xl:gap-24 xl:flex-row pt-28 pb-12 sm:py-0 xl:mb-24">
                        {/* Image */}
                        <div className = "relative w-full h-[320px] xl:max-w-[670px] xl:h-[500px] rounded-2xl overflow-hidden mb-12 xl:mb-0">
                            <Image src = {event.img_lg} fill className = "object-cover mix-blend-lighten" quality = {100} alt = "img-lg" />
                        </div>
                        {/* Info */}
                        <div className = "flex w-full max-w-[460px] flex-col justify-center gap-8 flex-1 sm:mb-12 xl:mb-0">
                            <div className = "">
                                <h2 className = "h2 mb-4">
                                    {event.title}
                                </h2>
                                <EventSchedule event = {event} />
                            </div>
                            <Timer event = {event} />
                            <CustomSelect event = {event} />
                            <BuyTicket event = {event} />
                        </div>
                    </div>
                    {/* Event details 2 */}
                    <div className = "flex flex-col xl:flex-row gap-8 xl:gap-24">
                        {/* Description */}
                        <div className = "w-full xl:max-w-[670px] flex flex-col gap-8 xl:gap-12">
                            <p className = "text-grey text-justify">
                                {event.description}
                            </p>
                            {/* Requirements */}
                            <Requirements event = {event} />
                        </div>
                        {/* Organizers */}
                        <div className = "w-full max-w-[460px]">
                            <Organizers event = {event} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDetails;