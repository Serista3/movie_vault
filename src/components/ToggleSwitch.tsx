import Button from "./common/Button";

interface ToggleSwitchProps {
    title: string;
    modes: string[];
    activeMode: string;
    onChange: (title: string, mode: string) => void;
}

export default function ToggleSwitch({ title, modes, activeMode, onChange }: ToggleSwitchProps) {
    return (
        <div className="rounded-full border-2 border-main-light self-start flex justify-center items-center overflow-hidden">
            {modes.map(mode => {
                return (
                    <Button 
                        key={mode} 
                        className={`px-4 ${activeMode === mode ? 'bg-main-light text-back-light' : 'text-white-light bg-transparent hover:bg-back-dark'}`}
                        disabled={activeMode === mode}
                        onClick={() => onChange(title, mode)}>
                        {mode}
                    </Button>
                )
            })}
        </div>
    )
}
