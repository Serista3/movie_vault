interface ImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function Image({ className = 'w-full h-full', ...props }: ImageProps){
  return (
    <div className="container-image overflow-hidden rounded-[10px]">
      <img className={`image ${className} object-cover transition-all duration-300`} {...props}/>
    </div>
  );
}
