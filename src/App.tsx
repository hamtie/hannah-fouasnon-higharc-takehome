'use client'
import smoothieLogo from "./assets/icons8-smoothie.svg";

export default function App() {
    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
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
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Smoothie Recipes
                </h2>

            </nav>
        </header>
    )
}
