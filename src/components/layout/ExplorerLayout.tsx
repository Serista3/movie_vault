import Heading from "../common/Heading";

interface ExplorerLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export default function ExplorerLayout({ title, children }: ExplorerLayoutProps) {
  return (
    <div className="explorer-layout max-w-300 mx-auto w-full flex flex-col gap-5 pt-8 px-4 pb-14">
      <Heading level={1}>{title}</Heading>
      {children}
    </div>
  )
}