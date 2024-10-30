import React, { useEffect } from 'react';
import { SmoothieCreateCard } from "./SmoothieCreateCard"
import { SmoothieCard } from "./SmoothieCard"
import { Smoothie, useSmoothies } from "../contexts/SmoothiesContext";

export const SmoothieGrid: React.FC = () => {
    const { smoothies, addSmoothie } = useSmoothies();

    return (
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <SmoothieCreateCard />
            {smoothies.map((smoothie: Smoothie) => (
                <SmoothieCard smoothie={smoothie} />
            ))}
        </div >
    );
};

