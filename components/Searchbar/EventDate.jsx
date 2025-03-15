"use client";

import React, { useContext } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover } from "@/components/ui/popover";
import { BiCalendar, BiChevronDown } from "react-icons/bi";
import { EventContext } from "@/contexts/EventContext";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const EventDate = () => {
    const { selectedDate, setSelectedDate } = useContext(EventContext);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className = "w-full flex items-center gap-[10px] xl:w-[190px] cursor-pointer">
            <div className = "text-lg text-accent">
                <BiCalendar />
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className = "w-full flex justify-between items-center p-0 bg-transparent hover:bg-transparent">
                        <Button className = "w-full justify-start p-0 bg-transparent hover:bg-transparent">
                            {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Elige una fecha</span>}
                        </Button>
                        <div className = "text-[26px] text-white">
                            <BiChevronDown />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className = "w-auto p-0 bg-secondary border-0 text-white">
                    <Calendar mode = "single" selected = {selectedDate} onSelect = {handleDateChange} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EventDate;