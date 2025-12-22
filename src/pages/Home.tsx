import MediaList from "../components/MediaList";

export default function Home() {
  return (
    <div className="home flex flex-col gap-25 py-8">
      <div className="px-4">
        <MediaList category="popular" page={1} media_type='movie' />
      </div>
      <div className="px-4">
        <MediaList category="popular" page={2} media_type='tv' />
      </div>
    </div>
  );
}
