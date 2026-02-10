// --- IMPORTS ---
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getMovieCredits, getMovie, getTvShowAggregateCredits, getTvShow } from "@/services";
import type { MovieCredits, TvShowAggregateCredits, MovieDetail, TvShowDetail, AppError } from "@/@types";
import { isAppError, isMovieDetail } from "@/guards";
import { getMediaCrews } from "@/utils";
import { SubPageMediaLayout } from "@/components/layout";
import { Heading, Paragraph, ErrorMessage, Anchor } from "@/components/common";
import { CreditListItem } from "@/features/person";

export default function Credits() {
  // --- MANAGE DATA ---
  const { mediaCredits, mediaDetail } = useLoaderData<CreditsLoaderData>();
  const isMediaCrews = !isAppError(mediaCredits) ? mediaCredits.crew : []
  const mediaCrews = getMediaCrews(isMediaCrews)

  return (
    <>
      {isAppError(mediaDetail) && <ErrorMessage error={mediaDetail} />}
      {!isAppError(mediaDetail) && (
        <SubPageMediaLayout 
          mediaDetail={mediaDetail}
          anChorEl={<Anchor to={`/${isMovieDetail(mediaDetail) ? 'movie' : 'tv'}/${mediaDetail.id}`}>Back to Detail</Anchor>}
        >
          {isAppError(mediaCredits) && <ErrorMessage error={mediaCredits} />}
          {/* --- LIST MEDIA CAST & CREW --- */}
          {!isAppError(mediaCredits) && (
            <div className="flex flex-col sm:flex-row gap-14 mb-14">
              {/* --- MEDIA CAST --- */}
              <div className="flex flex-col gap-8">
                <Heading level={2}>
                  Cast &nbsp;
                  <span className="font-light text-tertiary-dark">
                    {mediaCredits.cast.length}
                  </span>
                </Heading>
                <div className="flex flex-col gap-6">
                  {mediaCredits.cast.length > 0 && mediaCredits.cast.map(castMember => (
                    <CreditListItem key={`${castMember.id}-${castMember.id}`} credit={castMember} />
                  ))}
                </div>
                {mediaCredits.cast.length === 0 && (
                  <Paragraph>No cast information available.</Paragraph>
                )}
              </div>

              {/* --- MEDIA CREW --- */}
              <div className="flex flex-col gap-8">
                <Heading level={2}>
                  Crew &nbsp;
                  <span className="font-light text-tertiary-dark">
                    {mediaCredits.crew.length}
                  </span>
                </Heading>
                <div className="flex flex-col gap-12">
                  {mediaCredits.crew.length > 0 && mediaCrews.map(crew => (
                    <div key={`${crew.department}`} className="flex flex-col gap-4">
                      <Heading level={3}>{crew.department}</Heading>
                      <div className="flex flex-col gap-6">
                        {crew.crews.map(crew => <CreditListItem key={`${crew.id}-${crew.credit_id}`} credit={crew} />)}
                      </div>
                    </div>
                  ))}
                </div>
                {mediaCredits.crew.length === 0 && (
                  <Paragraph>No crew information available.</Paragraph>
                )}
              </div>
            </div>
          )}
        </SubPageMediaLayout>
      )}
    </>
  );
}

// --- TYPE DEFINATIONS ---
interface CreditsLoaderData {
  mediaCredits: MovieCredits | TvShowAggregateCredits | AppError;
  mediaDetail: MovieDetail | TvShowDetail | AppError;
}

// --- LOADERS ---
export const loader = async function({ request, params }: LoaderFunctionArgs): Promise<CreditsLoaderData> {
  const url = new URL(request.url);
  const mediaId = Number(params.id);
  const mediaType = url.pathname.includes('/movie/') ? 'movie' : 'tv';
  
  if(mediaType === 'movie'){
    const mediaCredits = await getMovieCredits(mediaId);
    const mediaDetail = await getMovie(mediaId);
    return { mediaCredits, mediaDetail };
  }
  
  const mediaCredits = await getTvShowAggregateCredits(mediaId);
  const mediaDetail = await getTvShow(mediaId);

  return { mediaCredits, mediaDetail };
}