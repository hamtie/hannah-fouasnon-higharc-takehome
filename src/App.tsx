'use client'
import smoothieLogo from "./assets/icons8-smoothie.svg";
import { SmoothieGrid } from "./components/SmoothieGrid";
import { SmoothiesProvider, } from './contexts/SmoothiesContext';
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function App() {
    return (
        <SmoothiesProvider>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="m-1 p-1">
                            <span className="sr-only">Smoothie Recipes</span>
                            <img
                                alt="Smoothie Recipes"
                                src={smoothieLogo}
                                className="h-8 w-auto"
                            />
                        </a>
                    </div>
                    <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight flex items-center">
                        <ChevronDoubleRightIcon className="h-5 w-5 mr-2 text-yellow-300" />
                        <span>Smoothie Recipes</span>
                    </h2>
                </nav>
            </header>
            <SmoothieGrid />
        </SmoothiesProvider>
    )
}
