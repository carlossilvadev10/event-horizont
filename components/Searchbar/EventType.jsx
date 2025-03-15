import React, { useContext } from "react";
import { BiLayer } from "react-icons/bi";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventContext } from "@/contexts/EventContext";

export const EventType = () => {
    const { events, selectedType, setSelectedType } = useContext(EventContext);
    const uniqueTypes = [
        "Todos los tipos",
        ...new Set(events.map((event) => event.type)),
    ];

    return (
        <div className = "flex items-center gap-[10px] w-full xl:w-[190px] select-none">
            {/* Icon */}
            <div className = "text-lg text-accent">
                <BiLayer />
            </div>
            <Select value = {selectedType ?? null} onValueChange = {(value) => setSelectedType(value)}>
                <SelectTrigger className = "bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0 capitalize">
                    <SelectValue placeholder = "Tipos de evento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                            Tipo
                        </SelectLabel>
                        {uniqueTypes.map((type, index) => {
                            return (
                                <SelectItem value = {type === "Todos los tipos" ? null : type} key = {index} className = "capitalize">{type}</SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default EventType;