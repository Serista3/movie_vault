interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div 
      className={`card ${className} overflow-hidden rounded-[10px] snap-center relative transition-all duration-300`}>
      {children}
    </div>
  );
}
