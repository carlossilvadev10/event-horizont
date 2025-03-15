"use client";

import React, { useContext, useEffect } from "react";
import { TicketContext } from "@/contexts/TicketContext";
import { PiChairFill } from "react-icons/pi";

const CustomSelect = ({ event }) => {
    const {seat, showMenu, setShowMenu, handleSeat, initializeEvent } = useContext(TicketContext);
    // Inicializar el evento
    useEffect(() => {
        initializeEvent(event);
    }, []);

    return (
        <div className = "custom-select bg-secondary w-full h-[64px] rounded-full flex items-center justify-between px-8 relative cursor-pointer select-none" onClick = {(e) => { setShowMenu((prev) => !prev); e.stopPropagation(); }}>
            <div className = "flex items-center gap-2 w-full">
                <div className = "text-xl text-accent">
                    <PiChairFill />
                </div>
                <div className = "flex items-center justify-between w-full">
                    <div className = "flex-1 capitalize">
                        {seat.seat}
                    </div>
                    <div className = "flex items-center gap-2">
                        <div className = "font-semibold">
                            S/. {seat.price}
                        </div>
                        <div className = "text-sm text-white/60">
                            cada uno
                        </div>
                    </div>
                </div>
            </div>
            {/* Menu */}
            {showMenu && (
                <ul className = "bg-secondary absolute top-[70px] left-0 overflow-hidden w-full rounded-3xl">
                    {event.seats.map((seat, index) => (
                        <li key = {index} className = "cursor-pointer hover:bg-white/5 px-8 py-6" onClick = {(e) => { handleSeat(seat.seat, seat.price); e.stopPropagation(); }}>
                            <div className = "flex justify-between">
                                <div className = "capitalize">
                                    {seat.seat}
                                </div>
                                <div className = "">
                                    S/. {seat.price}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CustomSelect;