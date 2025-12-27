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

export default function Button({ children, className, ...props }: ButtonProps) {
  const buttonClass = 'rounded-md px-4 text-back-light bg-main-light shadow-lg hover:bg-main-dark hover:shadow-xl active:scale-95';
  return (
    <button className={`cursor-pointer py-1.5 font-medium transition-all ${className ?? buttonClass}`} {...props}>
      {children}
    </button>
  );
};


