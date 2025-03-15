"use client";

import React, { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
    const [event, setEvent] = useState(null); // Estado para almacenar los datos del evento
    const [seat, setSeat] = useState({ seat: null, price: null }); // Estado para almacenar el asiento seleccionado
    const [showMenu, setShowMenu] = useState(true); // Estado para gestionar la visibilidad del menú
    const [itemAmount, setItemAmount]= useState(1); // Estado para rastrear la cantidad de items
    const [totalPrice, setTotalPrice] = useState(0); // Estado para almacenar el precio total
    const [checkoutData, setCheckoutData] = useState(null); // Estado para almacenar el pago

    const initializeEvent = (fetchedEvent) => {
        setEvent(fetchedEvent);
        // Reiniciar la cantidad de ítems cuando se inicializa un nuevo evento
        setItemAmount(1);
        // Inicializar el 'asiento delantero' si existe en los datos del evento obtenidos
        const frontseat = fetchedEvent?.seats.find(
            (seat) => seat.seat === "frontseat"
        );

        if (frontseat) {
            setSeat({ seat: frontseat.seat, price: frontseat.price });
        }
    };

    // Efecto para manejar el clic fuera del menú y cerrarlo
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".custom-select")) {
                setShowMenu(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    // Calcular el precio total cada vez que cambie el precio del asiento o la cantidad de items
    useEffect(() => {
        setTotalPrice(seat.price * itemAmount);
    }, [seat.price, itemAmount]);

    // Función para manejar la selección de asiento
    const handleSeat = (seat, price) => {
        setSeat({ seat, price });
        setShowMenu(false);
    };

    // Función para manejar la acción de "Comprar ahora"
    const buyNow = (event) => {
        const ticketData = {
            eventId: event.id,
            seat: seat.seat,
            ticketType: seat.seat,
            ticketPrice: seat.price,
            amount: itemAmount,
            totalPrice,
        }
        setCheckoutData(ticketData); // En caso de que queramos usar los datos para la página de pago
    };

    const increaseAmount = () => {
        setItemAmount((prevAmount) => prevAmount + 1);
    };

    const decreaseAmount = () => {
        setItemAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : 1));
    };

    return (
        <TicketContext.Provider value = {{ event, seat, setSeat, showMenu, setShowMenu, itemAmount, totalPrice, checkoutData, initializeEvent, handleSeat, buyNow, increaseAmount, decreaseAmount }}>
            {children}
        </TicketContext.Provider>
    )
}

export default TicketProvider;