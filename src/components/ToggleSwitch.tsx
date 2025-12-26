import { useState } from "react";

import Button from "./common/Button";

interface ToggleSwitchProps {
    modes: string[];
}

export default function ToggleSwitch({ modes }: ToggleSwitchProps) {
    const [activeMode, setActiveMode] = useState(modes[0]);
    
    return (
        <div className="rounded-full border-2 border-main-light self-start flex justify-center items-center overflow-hidden">
            {modes.map(mode => {
                return <Button 
                            key={mode} 
                            className={`px-4 rounded-full hover:bg-main-light hover:text-back-light transition-all ${activeMode === mode ? 'bg-main-light text-back-light' : 'text-white-light bg-transparent'}`}
                            onClick={() => setActiveMode(mode)}
                            >
                            {mode}
                        </Button>
            })}
        </div>
    )
}