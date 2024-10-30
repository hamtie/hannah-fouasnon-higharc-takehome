import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';

export interface Ingredient {
    quantity: string;
    name: string;
}

export interface Smoothie {
    id: number;
    name: string;
    ingredients: Ingredient[];
}

type SmoothieAction =
    | { type: 'add'; smoothie: Smoothie; }
    | { type: 'set'; smoothies: Smoothie[]; }

interface SmoothiesContextType {
    smoothies: Smoothie[];
    deleteSmoothie: (id: number) => void;
    addSmoothie: (smoothie: Smoothie) => void;
    activeCardId: number | null;
    setActiveCardId: (id: number | null) => void;
    smoothieToEdit: Smoothie | null;
    setSmoothieToEdit: (smoothie: Smoothie | null) => void;
    editSmoothie: (smoothie: Smoothie) => void;
};

type DispatchContextType = React.Dispatch<SmoothieAction>;

// Create Contexts with proper typing
const SmoothiesContext = createContext<SmoothiesContextType | undefined>(undefined);
const SmoothiesDispatchContext = createContext<DispatchContextType | undefined>(undefined);

interface SmoothiesProviderProps {
    children: ReactNode;
}

export const SmoothiesProvider = ({ children }: SmoothiesProviderProps) => {
    const initialSmoothies = loadSmoothiesFromLocalStorage();
    const [smoothies, dispatch] = useReducer(smoothiesReducer, initialSmoothies);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [smoothieToEdit, setSmoothieToEdit] = useState<Smoothie | null>(null);


    // Load smoothies from localStorage
    const loadSmoothies = () => {
        const smoothies = loadSmoothiesFromLocalStorage();
        dispatch({ type: 'set', smoothies: smoothies });
    };

    // Delete a smoothie from localStorage
    const deleteSmoothie = (id: number) => {
        const smoothies = loadSmoothiesFromLocalStorage();
        dispatch({ type: 'set', smoothies: smoothies.filter((s) => s.id !== id) });
    };

    const addSmoothie = (smoothieI: Smoothie) => {
        const smoothies = loadSmoothiesFromLocalStorage();
        const nextId = smoothieI.id > -1 ? smoothieI.id : smoothies.length++;
        const smoothie: Smoothie = { ...smoothieI, id: nextId, };
        dispatch({ type: 'add', smoothie: smoothie });
    };

    const editSmoothie = (smoothie: Smoothie) => {
        const smoothies = loadSmoothiesFromLocalStorage();
        const index = smoothies.findIndex((s) => s.id === smoothie.id);
        smoothies.splice(index, 1, smoothie);
        dispatch({ type: 'set', smoothies: smoothies });
    };

    // Whenever the smoothies change, save them to localStorage
    useEffect(() => {
        saveSmoothiesToLocalStorage(smoothies);
    }, [smoothies]);

    useEffect(() => {
        loadSmoothies(); // Load smoothies from localStorage on app startup
    }, []);

    return (
        <SmoothiesContext.Provider value={{
            smoothies,
            deleteSmoothie,
            addSmoothie,
            activeCardId,
            setActiveCardId,
            smoothieToEdit,
            setSmoothieToEdit,
            editSmoothie,
        }}>
            <SmoothiesDispatchContext.Provider value={dispatch}>
                {children}
            </SmoothiesDispatchContext.Provider>
        </SmoothiesContext.Provider>
    );
}

const smoothiesReducer = (smoothies: Smoothie[], action: SmoothieAction): Smoothie[] => {
    switch (action.type) {
        case 'add':
            return [action.smoothie, ...smoothies,];
        case 'set':
            return action.smoothies;
        default: {
            throw new Error('Unknown action: ' + action);
        }
    }
}

// Helper functions to manage smoothies in local storage
const saveSmoothiesToLocalStorage = (smoothies: Smoothie[]) => {
    localStorage.setItem('smoothies', JSON.stringify(smoothies));
};

const loadSmoothiesFromLocalStorage = (): Smoothie[] => {
    const storedSmoothies = localStorage.getItem('smoothies');
    return storedSmoothies ? JSON.parse(storedSmoothies) : [];
};

export const useSmoothies = (smoothies?: Smoothie[]) => {
    const context = useContext(SmoothiesContext);
    if (context === undefined) {
        throw new Error('useSmoothies must be used within a SmoothiesProvider');
    }
    return context;
}
