"use client";

import { useState, useEffect } from "react";

import React from "react";

const Timer = ({ event }) => {
    // Calcular la fecha y hora objetivo del evento
    const eventDate = new Date(`${event.date}T${event.hour}`);
    // Estado para rastrear el tiempo restante en milisegundos
    const [timeRemaining, setTimeRemaining] = useState(eventDate - new Date());
    // Manejar la lógica del temporizador de cuenta regresiva
    useEffect(() => {
        // Establecer un intervalo que se ejecute cada segundo
        const interval = setInterval(() => {
            const now = new Date(); // Obtener la hora actual
            const timeLeft = eventDate - now; // Calcular el tiempo restante

            // Si se acaba el tiempo, se limpia el intervalo y se detiene la cuenta regresiva
            if (timeLeft <= 0) {
                clearInterval(interval);
                setTimeRemaining(0);
            } else {
                setTimeRemaining(timeLeft); // Actualizar el estado del tiempo restante
            }
        }, 1000); // Se ejecuta cada 1000 milisegundos (1 segundo)

        // Función de limpieza que elimina el intervalo al desmontarse el componente
        return () => clearInterval(interval);
    }, [eventDate]); // El array de dependencias asegura que el efecto se ejecute solo cuando "eventDate" cambie

    // Si la cuenta regresiva ha terminado, muestra un mensaje
    if (timeRemaining <= 0) {
        return <div>¡El evento ya ha pasado!</div>
    }

    // Calcular los días, horas, minutos y segundos restantes a partir de "timeRemaining"
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); // Días totales
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Horas restantes en el día actual
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes en la hora actual
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Segundos restantes en el minuto actual

    return (
        <div className = "flex flex-wrap gap-4">
            {/* Days */}
            <div className = "text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
                <div className = "">
                    <div className = "text-3xl font-semibold">
                        {days}
                    </div>
                    <div className = "text-sm uppercase font-medium">
                        días
                    </div>
                </div>
            </div>
            {/* Hours */}
            <div className = "text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
                <div className = "">
                    <div className = "text-3xl font-semibold">
                        {hours}
                    </div>
                    <div className = "text-sm uppercase font-medium">
                        horas
                    </div>
                </div>
            </div>
            {/* Minutes */}
            <div className = "text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
                <div className = "">
                    <div className = "text-3xl font-semibold">
                        {minutes}
                    </div>
                    <div className = "text-sm uppercase font-medium">
                        minutos
                    </div>
                </div>
            </div>
            {/* Seconds */}
            <div className = "text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
                <div className = "">
                    <div className = "text-3xl font-semibold">
                        {seconds}
                    </div>
                    <div className = "text-sm uppercase font-medium">
                        segundos
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer;