"use client";

import React, { useState, useEffect } from "react";
import TimeBox from "./TimeBox";

const Timer = ({ event }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const eventDate = new Date(`${event.date}T${event.hour}`);
        const updateRemaining = () => {
            const now = new Date();
            const timeLeft = eventDate - now;
            setTimeRemaining(timeLeft > 0 ? timeLeft : 0);
        };

        updateRemaining(); // Inicializa inmediatamente

        const interval = setInterval(updateRemaining, 1000);

        return () => clearInterval(interval);
    }, [event.date, event.hour]);

    // Mostrar nada hasta que se haya montado en el cliente
    if (timeRemaining === null) {
        return <div>Cargando temporizador...</div>
    }

    if (timeRemaining <= 0) {
        return <div>¡El evento ya ha pasado!</div>;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return (
        <div className = "flex flex-wrap gap-4">
            {/* Resto del código igual */}
            {/* Días */}
            <TimeBox value = {days} label = "días" />
            <TimeBox value = {hours} label = "horas" />
            <TimeBox value = {minutes} label = "minutos" />
            <TimeBox value = {seconds} label = "segundos" />
        </div>
    )
}

export default Timer;