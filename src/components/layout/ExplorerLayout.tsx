interface ExplorerLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export default function ExplorerLayout({ title, children }: ExplorerLayoutProps) {
  return (
    <div className="explorer-layout max-w-300 mx-auto w-full flex flex-col gap-5 pt-8 px-4 pb-14">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {children}
    </div>
  )
}