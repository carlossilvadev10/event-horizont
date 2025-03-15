"use client";

import React, { useContext, useState } from "react";
import { TicketContext } from "@/contexts/TicketContext";
import { BiPlus, BiMinus } from "react-icons/bi";
import { HiTicket } from "react-icons/hi2"

const BuyTicket = ({ event }) => {
    const { buyNow, itemAmount, totalPrice, increaseAmount, decreaseAmount } = useContext(TicketContext);
    const [isLoading, setIsLoading]  = useState(false);

    const handleBuyNow = () => {
        setIsLoading(true); // Mostrar cargador
        buyNow(event); // Activar la lógica de buyNow
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Ajustar el retraso según sea necesario
    }

    return (
        <div className = "flex flex-col md:flex-row gap-8 md:gap-4">
            {/* Controles de incremento y decremento de cantidad */}
            <div className = "w-[200px] md:w-[300px] flex items-center justify-between bg-secondary p-2 rounded-full">
                {/* Decremento */}
                <div className = "cursor-pointer bg-accent w-[48px] h-[48px] flex items-center justify-center select-none rounded-full" onClick = {() => decreaseAmount()}>
                    <BiMinus className = "text-lg" />
                </div>
                {/* Cantidad */}
                <div className = "">
                    {itemAmount}
                </div>
                {/* Aumento */}
                <div className = "cursor-pointer bg-accent w-[48px] h-[48px] flex items-center justify-center select-none rounded-full" onClick = {() => increaseAmount()}>
                    <BiPlus className = "text-lg" />
                </div>
            </div>
            {/* buyNow btn */}
            <button className = "bg-accent hover:bg-accent-hover transition-all p-4 rounded-full w-full" onClick = {handleBuyNow}>
                <div className = "flex items-center justify-center">
                    {isLoading ? (
                        <div>Procesando...</div>
                    ) : (
                        <div className = "flex items-center gap-4">
                            <HiTicket className = "text-2xl" />
                            <div className = "">
                                {`${itemAmount} x ticket - S/. ${totalPrice}`}
                            </div>
                        </div>
                    )}
                </div>
            </button>
        </div>
    )
}

export default BuyTicket;