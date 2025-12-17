interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  const buttonClass = 'rounded-md px-4 text-back-light bg-main-light shadow-lg hover:bg-main-dark hover:shadow-xl active:scale-95';
  return (
    <button className={`cursor-pointer py-2 font-medium transition-all ${className ?? buttonClass}`} {...props}>
      {children}
    </button>
  );
};


