import React, { useEffect, useState } from 'react';
import { Ingredient, Smoothie, useSmoothies } from "../contexts/SmoothiesContext";

interface IngredientListProps {
    ingredients: Ingredient[];
}

interface SmoothieProps {
    smoothie: Smoothie;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
    return (
        <ul>
            {ingredients.map((ingredient: Ingredient, index: number) => (
                <li key={`${ingredient.quantity}-${ingredient.name}-${index}`} className="text-sm text-gray-600">
                    {ingredient.quantity} {ingredient.name}
                </li>
            ))}
        </ul>
    );
};

export const SmoothieCard: React.FC<SmoothieProps> = ({ smoothie }) => {
    const { activeCardId, setActiveCardId, deleteSmoothie, smoothieToEdit, setSmoothieToEdit } = useSmoothies();
    const { id, name, ingredients } = smoothie;

    const handleClick = () => {
        if (activeCardId === id) {
            setActiveCardId(null);
        } else {
            setActiveCardId(id);
        }
    };

    const handleDelete = () => {
        deleteSmoothie(id);
        setActiveCardId(null);
    };

    const handleEdit = () => {
        setSmoothieToEdit(smoothie);
    };

    useEffect(() => {
        if (smoothieToEdit && smoothieToEdit.id > -1) {
            setActiveCardId(-1);
        }
    }, [smoothieToEdit]);

    return (
        <div
            key={id}
            onClick={handleClick}
            className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow h-64 flex flex-col justify-between"
        >
            {/* Main Content */}
            <div className="mb-16"> {/* Adds bottom margin for button space */}
                <h3 className="text-lg font-bold mb-2">{name}</h3>
                <IngredientList ingredients={ingredients} />
            </div>

            {/* Fixed Buttons at the Bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-x-6">
                <button type="button" onClick={handleEdit} disabled={(smoothieToEdit && smoothieToEdit.id === smoothie.id)} className="text-sm font-semibold text-gray-900">
                    Edit
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-md border border-red-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Delete
                </button>
            </div>
        </div >
    );
};
