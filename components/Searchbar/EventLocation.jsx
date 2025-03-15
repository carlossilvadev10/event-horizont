import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BiMap } from "react-icons/bi";

const EventLocation = () => {
    const { events, selectedLocation, setSelectedLocation } = useContext(EventContext);

    // Generar una lista de ubicaciones exclusivas de eventos futuros
    const uniqueLocations = [
        "Todas las ubicaciones", // Opción predeterminada para mostrar todas las ubicaciones
        ...new Set(events.filter((event) => { // Se utiliza un set para eliminar ubicaciones repetidas
            const currentDate = new Date(); // Obtener la fecha actual
            const [year, month, day] = event.date.split("-").map(Number); // Descomponemos la fecha para evitar problemas de zona horaria
            const eventDate = new Date(year, month - 1, day); // Creamos una fecha local SIN alterar la zona horaria, mes -1 porque en JS el mes es base 0

            // Incluir eventos que ocurran después de la fecha actual (sin importar la hora)
            if (eventDate > currentDate) return true;

            // Incluir eventos que ocurran hoy, pero solo si la hora aún no ha pasado
            if (eventDate.toDateString() === currentDate.toDateString()) {
                const eventTime = eventDate.getTime(); // Esto es la hora 00:00 del evento
                const currentTime = currentDate.getTime(); // Hora actual
                return eventTime > currentTime; // Esto compara 00:00 contra la hora actual (NO funciona como quieres)
            }

            // Excluir eventos pasados
            return false;
        }).map((event) => event.location)) // Extraer la ubicación de cada evento
    ];

    return (
        <div className = "flex items-center gap-[10px] w-full xl:w-[190px] select-none">
            {/* Icon */}
            <div className = "text-lg text-accent">
                <BiMap />
            </div>
            <Select value = {selectedLocation} onValueChange = {(value) => setSelectedLocation(value)}>
                <SelectTrigger className = "bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0">
                    <SelectValue placeholder = "Ubicación del evento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                            Ubicación
                        </SelectLabel>
                        {uniqueLocations.map((location, index) => {
                            return (
                                <SelectItem value = {location === "Todas las ubicaciones" ? null : location} key = {index}>{location}</SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default EventLocation;