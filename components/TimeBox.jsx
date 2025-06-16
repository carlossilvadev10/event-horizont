import React from "react";

const TimeBox = ({ value, label }) => (
    <div className = "text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
        <div>
            <div className = "text-3xl font-semibold">{value}</div>
            <div className = "text-sm uppercase font-medium">{label}</div>
        </div>
    </div>
);

export default TimeBox;