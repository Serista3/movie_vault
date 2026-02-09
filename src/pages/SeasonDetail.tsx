// --- IMPORTS ---
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTvShowSeason } from "@/services";
import type { TvShowSeasonDetail, AppError } from "@/@types";
import { isAppError } from "@/guards";
import { SubPageMediaLayout } from "@/components/layout";
import { WideMediaCard } from "@/features/media";
import { ErrorMessage, Paragraph } from "@/components/common";

export default function SeasonDetail() {
  const { tvShowSeasonDetail } = useLoaderData<SeasonDetailLoaderData>();

  return (
    <>
      {isAppError(tvShowSeasonDetail) && <ErrorMessage error={tvShowSeasonDetail} />}
      {!isAppError(tvShowSeasonDetail) && (
        <SubPageMediaLayout mediaDetail={tvShowSeasonDetail}>
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
  tvShowSeasonDetail: TvShowSeasonDetail | AppError;
}

// --- LOADERS ---
export const loader = async function({ params }: LoaderFunctionArgs): Promise<SeasonDetailLoaderData>{ 
  const tvShowId = Number(params.id);
  const seasonNumber = Number(params.seasonNumber)
  
  const tvShowSeasonDetail = await getTvShowSeason(tvShowId, seasonNumber);
  return { tvShowSeasonDetail };
}