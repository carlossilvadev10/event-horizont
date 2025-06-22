import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const Requirements = ({ event }) => {
    if (!event || !event.requirements || event.requirements.length === 0) return null;

    return (
        <div>
            <h3 className = "h3 mb-6">
                Requisitos para el evento
            </h3>
            <ul className = "flex flex-col gap-4">
                {
                    event.requirements.map((req, index) => (
                        <li key = {index} className = "flex gap-3 items-center">
                            <span className = "text-accent text-xl">
                                <FaRegCircleCheck />
                            </span>
                            <p className = "text-grey">{req}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Requirements;