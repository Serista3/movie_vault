import Button from "./common/Button";

import { cn } from "../utils/helperClassName";

interface ToggleSwitchProps {
    title: string;
    modes: string[];
    activeMode: string;
    onChange: (title: string, mode: string) => void;
}

export default function ToggleSwitch({ title, modes, activeMode, onChange }: ToggleSwitchProps) {
    return (
        <div className="rounded-full border-2 border-primary-light self-start flex justify-center items-center overflow-hidden shadow-xl">
            {modes.map(mode => {
                return (
                    <Button 
                        key={mode}
                        className={cn(
                            'text-tertiary-light bg-transparent hover:bg-secondary-dark rounded-none',
                            {'bg-primary-light text-secondary-light hover:bg-primary-light cursor-default': activeMode === mode}
                        )}
                        disabled={activeMode === mode}
                        onClick={() => onChange(title, mode)}>
                        {mode}
                    </Button>
                )
            })}
        </div>
    )
}
