interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = function ({ children, className, ...props }) {
  const buttonClass = 'rounded-md px-4 text-back-light shadow-lg ';
  return (
    <button className={`cursor-pointer py-2 font-medium transition-all ${className ?? buttonClass}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
