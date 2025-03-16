"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showEventList, setShowEventList] = useState(false);

    // Inputs de filtros actuales
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedType, setSelectedType] = useState("");

    // Filtros aplicados (después del submit)
    const [appliedFilters, setAppliedFilters] = useState({
        searchTerm: "",
        selectedLocation: "",
        selectedDate: null,
        selectedType,
    });

    // Filtered events basados ​​en los filtros aplicados
    const filteredEvents = useMemo(() => {
        const today = new Date();
        return events.filter((event) => {
            const eventDate = new Date(event.date);
            if (eventDate < today) return false;

            const matchesSearch = appliedFilters.searchTerm
                ? event.title.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase()) ||
                  event.type.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase())
                : true;

            const matchesLocation = appliedFilters.selectedLocation
                ? event.location.toLowerCase() === appliedFilters.selectedLocation.toLowerCase()
                : true;

            const matchesDate = appliedFilters.selectedDate
                ? eventDate.toISOString().split("T")[0] === new Date(appliedFilters.selectedDate).toISOString().split("T")[0]
                : true;

            const matchesType = appliedFilters.selectedType
                ? event.type.toLowerCase() === appliedFilters.selectedType.toLowerCase()
                : true;

            return matchesSearch && matchesLocation && matchesDate && matchesType;
        });
    }, [events, appliedFilters]);

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);

            try {
                // Obtienes la URL de la variable de entorno
                const API_URL = process.env.NEXT_PUBLIC_API_URL;

                if (!API_URL) {
                    throw new Error("API_URL no está definida. Revisa tus variables de entorno.");
                }

                const res = await fetch(`${API_URL}/events`);

                if (!res.ok) throw new Error("Failed to fetch events");

                const data = await res.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleSubmit = () => {
        setIsLoading(true);
        setShowEventList(true);
        setAppliedFilters({
            searchTerm,
            selectedLocation,
            selectedDate,
            selectedType,
        });

        setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setShowEventList(false);
        setSelectedLocation("");
        setSelectedDate(false);
        setSelectedType("");
    };

    const formatDate = (dateString, type = "default") => {
        const [year, month, day] = dateString.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        let options;

        switch (type) {
            case "event":
                options = { weekday: "short", day: "numeric", month: "short" };
                break;
            case "schedule":
                options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
                break;
            default:
                options = { day: "numeric", month: "numeric", year: "numeric" };
        }

        return date.toLocaleDateString("es-ES", options);
    };

    return (
        <EventContext.Provider
            value={{
                events,
                isLoading,
                error,
                showEventList,
                searchTerm,
                setSearchTerm,
                selectedLocation,
                setSelectedLocation,
                selectedDate,
                setSelectedDate,
                selectedType,
                setSelectedType,
                filteredEvents,
                handleSubmit,
                handleClearSearch,
                formatDate,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

export default EventProvider;
