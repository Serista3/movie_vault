// --- IMPORTS ---
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTvShow } from "@/services";
import type { TvShowDetail, AppError } from "@/@types";
import { isAppError } from "@/guards";
import { SubPageMediaLayout } from "@/components/layout";
import { WideMediaCard } from "@/features/media";
import { ErrorMessage, Paragraph } from "@/components/common";

export default function Seasons() {
  const { tvShowDetail } = useLoaderData<SeasonsLoaderData>();

  return (
    <>
      {isAppError(tvShowDetail) && <ErrorMessage error={tvShowDetail} />}
      {!isAppError(tvShowDetail) && (
        <SubPageMediaLayout mediaDetail={tvShowDetail}>
          {/* --- TV SHOW SEASONS --- */}
          {tvShowDetail.seasons.length > 0 && (
            <div className="flex flex-col gap-8">
              {tvShowDetail.seasons.map(season => (
                <WideMediaCard key={season.id} media={season} showRating={true} />
              ))}
            </div>
          )}
          {tvShowDetail.seasons.length === 0 && (
            <Paragraph>No season available.</Paragraph>
          )}
        </SubPageMediaLayout>
      )}
    </>
  );
}

// --- TYPE DEFINATIONS ---
interface SeasonsLoaderData {
  tvShowDetail: TvShowDetail | AppError;
}

// --- LOADERS ---
export const loader = async function({ params }: LoaderFunctionArgs): Promise<SeasonsLoaderData>{ 
  const tvShowId = Number(params.id);
  
  const tvShowDetail = await getTvShow(tvShowId);
  return { tvShowDetail };
}