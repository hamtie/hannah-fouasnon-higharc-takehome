import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSmoothies, } from "../contexts/SmoothiesContext";

// Component to render each ingredient input
interface IngredientFormInputProps {
    index: number;
    quantity: string;
    ingredientName: string;
    onChange: (index: number, field: string, value: string) => void;
}

const IngredientFormInput: React.FC<IngredientFormInputProps> = ({
    index,
    quantity,
    ingredientName,
    onChange,
}) => (
    <div className="grid grid-cols-6 gap-x-4 items-center mb-4">
        <div className="col-span-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                    type="text"
                    name="quantity"
                    id={`quantity-${index}`}
                    value={quantity}
                    onChange={(e) => onChange(index, "quantity", e.target.value)}
                    autoComplete="quantity"
                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="e.g. 1 cup"
                />
            </div>
        </div>
        <div className="col-span-4">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                    type="text"
                    name="ingredient"
                    id={`ingredient-${index}`}
                    value={ingredientName}
                    onChange={(e) => onChange(index, "name", e.target.value)}
                    autoComplete="ingredient"
                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="e.g. milk"
                />
            </div>
        </div>
    </div>
);

export const SmoothieCreateCard: React.FC = () => {
    const { activeCardId, setActiveCardId, addSmoothie, smoothieToEdit, setSmoothieToEdit, editSmoothie } = useSmoothies();
    const [isExpanded, setIsExpanded] = useState(false);


    useEffect(() => {
        setIsExpanded(activeCardId === -1);
    }, [activeCardId]);

    const handleClick = () => {
        // Tiny bit of a hack to use `-1` but also keeps things a little simpler
        if (!isExpanded) {
            setActiveCardId(activeCardId > -1 ? -1 : null);
            setSmoothieToEdit({ id: -1, name: "", ingredients: [{ quantity: "", name: "" }] });
        }

    };

    const setName = (name: string) => {
        if (smoothieToEdit) {
            setSmoothieToEdit({ ...smoothieToEdit, name });
        }
    };

    const handleIngredientChange = (index: number, field: string, value: string) => {
        const updatedIngredients = smoothieToEdit.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setSmoothieToEdit({ ...smoothieToEdit, ingredients: updatedIngredients });
    };

    const addIngredient = () => {
        setSmoothieToEdit({
            ...smoothieToEdit,
            ingredients: [...smoothieToEdit.ingredients, { quantity: "", name: "" }],
        });
    };

    const handleSave = () => {
        if (smoothieToEdit.id > -1) {
            editSmoothie(smoothieToEdit);
        } else {
            addSmoothie(smoothieToEdit);
        }
        setActiveCardId(null);
    };

    const cancelAdd = () => {
        setActiveCardId(null);
        setIsExpanded(false);
        setSmoothieToEdit({ id: -1, name: "", ingredients: [{ quantity: "", name: "" }] });
    };

    return (
        <div
            onClick={handleClick}
            className={`flex min-h-44 justify-center rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer ${isExpanded ? 'bg-white' : 'bg-yellow-300'}`}
        >
            {!isExpanded ? (
                <div className="flex space-x-2 items-center justify-center">
                    <PlusIcon className="h-8 w-8" />
                    <h3 className="text-xl font-bold">Add Recipe</h3>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-6 gap-x-4 items-center">
                        <div className="col-span-6">
                            <span className="font-bold text-lg text-gray-600">Name</span>
                            <div className="col-span-6">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        value={smoothieToEdit.name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                        placeholder="My Favorite Smoothie"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="py-5 col-span-6">
                            <span className="font-bold text-lg text-gray-600">Ingredients</span>
                            <p className="text-sm text-gray-600">Add the ingredient and the quantity for your smoothie recipe.</p>

                            {smoothieToEdit.ingredients.map((ingredient, index) => (
                                <IngredientFormInput
                                    key={index}
                                    index={index}
                                    quantity={ingredient.quantity}
                                    ingredientName={ingredient.name}
                                    onChange={handleIngredientChange}
                                />
                            ))}
                        </div>

                        <div className="space-x-2 col-span-6">
                            <button
                                onClick={addIngredient}
                                className="flex rounded-md border border-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <PlusIcon className="h-5 w-5 text-gray-600" />
                                <span className="text-md font-semibold">Add Ingredient</span>
                            </button>
                        </div>

                    </div>
                    <div className="flex items-center justify-end gap-x-6 mt-6">
                        <button type="button" onClick={cancelAdd} className="text-sm font-semibold text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="rounded-md border border-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
