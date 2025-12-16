const Logo: React.FC<{ className?: string }> = function({ className }){
  return <h1 className={`text-3xl font-semibold ${ className ?? '' }`}>MovieVault</h1>;
}

export default Logo;
