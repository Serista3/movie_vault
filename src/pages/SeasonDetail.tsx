// --- IMPORTS ---
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTvShow, getTvShowSeason } from "@/services";
import type { TvShowDetail, TvShowSeasonDetail, AppError } from "@/@types";
import { isAppError } from "@/guards";
import { SubPageMediaLayout } from "@/components/layout";
import { WideMediaCard } from "@/features/media";
import { ErrorMessage, Paragraph, Anchor, Heading } from "@/components/common";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

export default function SeasonDetail() {
  const { tvShowDetail, tvShowSeasonDetail } = useLoaderData<SeasonDetailLoaderData>();

  // --- COMPUTED SEASON PAGE ---
  const prevSeason = !isAppError(tvShowDetail) && !isAppError(tvShowSeasonDetail) 
    ? tvShowDetail.seasons.find(s => s.season_number === tvShowSeasonDetail.season_number - 1) : null
  const nextSeason = !isAppError(tvShowDetail) && !isAppError(tvShowSeasonDetail) 
    ? tvShowDetail.seasons.find(s => s.season_number === tvShowSeasonDetail.season_number + 1) : null

  return (
    <>
      {isAppError(tvShowSeasonDetail) && <ErrorMessage error={tvShowSeasonDetail} />}
      {isAppError(tvShowDetail) && <ErrorMessage error={tvShowDetail} />}
      {!isAppError(tvShowSeasonDetail) && !isAppError(tvShowDetail) && (
        <SubPageMediaLayout 
          mediaDetail={tvShowSeasonDetail}
          anChorEl={<Anchor to={`/tv/${tvShowDetail.id}/seasons`}>Back to seasons</Anchor>}
        >
          {/* --- PREV SEASON && NEXT SEASON --- */}
          <div className="w-full mb-4 py-2 px-3 border border-gray-dark rounded-md flex items-center justify-between">
            {prevSeason && tvShowSeasonDetail.season_number - 1 >= 0 && (
              <Anchor 
                className="w-fit flex items-center gap-1" 
                to={`/tv/${tvShowDetail.id}/season/${tvShowSeasonDetail.season_number - 1}`}
              >
                <FaCaretLeft />
                {prevSeason?.name}
              </Anchor>
            )}
            {nextSeason && tvShowSeasonDetail.season_number + 1 <= tvShowDetail.seasons.length && (
              <Anchor 
                className="w-fit flex items-center gap-1" 
                to={`/tv/${tvShowDetail.id}/season/${tvShowSeasonDetail.season_number + 1}`}
              >
                {nextSeason?.name}
                <FaCaretRight />
              </Anchor>
            )}
          </div>

          {/* --- EPISODE TITLE */}
          <Heading level={2} className="mb-1 sm:mb-2">
            Episodes &nbsp;
            <span className="font-light text-tertiary-dark">
              {tvShowSeasonDetail.episodes.length}
            </span>
          </Heading>

          {/* --- TV SHOW SEASON EPISODES --- */}
          {tvShowSeasonDetail.episodes.length > 0 && (
            <div className="flex flex-col gap-8">
              {tvShowSeasonDetail.episodes.map(episode => (
                <WideMediaCard key={episode.id} media={episode} showRating={true} />
              ))}
            </div>
          )}
          {tvShowSeasonDetail.episodes.length === 0 && (
            <Paragraph>No episode available.</Paragraph>
          )}
        </SubPageMediaLayout>
      )}
    </>
  );
}

// --- TYPE DEFINATIONS ---
interface SeasonDetailLoaderData {
  tvShowDetail: TvShowDetail | AppError
  tvShowSeasonDetail: TvShowSeasonDetail | AppError;
}

// --- LOADERS ---
export const loader = async function({ params }: LoaderFunctionArgs): Promise<SeasonDetailLoaderData>{ 
  const tvShowId = Number(params.id);
  const seasonNumber = Number(params.seasonNumber)
  
  const tvShowDetail = await getTvShow(tvShowId)
  const tvShowSeasonDetail = await getTvShowSeason(tvShowId, seasonNumber);
  return { tvShowDetail, tvShowSeasonDetail };
}