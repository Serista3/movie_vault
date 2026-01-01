type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  type?: ButtonType;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const defaultButtonClass = 'rounded-[10px] px-4 text-back-light bg-main-light hover:bg-main-dark';

export default function Button({ children, className = defaultButtonClass, ...props }: ButtonProps) {
  return (
    <button 
      className={`button py-1.5 ${className} font-medium shadow-xl cursor-pointer transition-all duration-300`} 
      {...props}>
      {children}
    </button>
  );
};
