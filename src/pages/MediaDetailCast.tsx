import { useLocation, useLoaderData, type LoaderFunctionArgs, Link } from "react-router";
import { isAggregateCast, isCast, isAggregateCrew, isCrew } from "@/utils/helper";
import { getMovieCredits, getMovie, getTvShowAggregateCredits, getTvShow } from "@/services";
import type { MovieCredits, TvShowAggregateCredits, MovieDetail, TvShowDetail, AppError } from "@/@types";
import { SubPageLayout } from "@/components/layout";
import { Heading, Paragraph, Image, ErrorMessage } from "@/components/common";

export default function MediaDetailCast() {
  const location = useLocation();
  const data = useLoaderData<MediaDetailCastLoaderData | AppError>();
  
  const headerSlot = 'mediaDetail' in data && 'id' in data.mediaDetail ? (
    <>
      {/* --- MEDIA HEADER --- */}
      <Image 
        src={data.mediaDetail.poster_path} 
        alt={('title' in data.mediaDetail) ? data.mediaDetail.title : data.mediaDetail.name} 
        containerClassName="h-27 w-18 rounded-md flex-none"
      />
      <div className="flex flex-col gap-1">
        <Heading level={1}>
          {('title' in data.mediaDetail) && data.mediaDetail.title }
          {('name' in data.mediaDetail) && data.mediaDetail.name }
        </Heading>
        <Link
          to={location.pathname.replace('/cast', '')}
          className="text-primary-light hover:text-primary-dark transition-all duration-300"
        >
          Back to Details
        </Link>
      </div>
    </>
  ): null;

  return (
    <SubPageLayout headerSlot={headerSlot}>
      {'isError' in data && <ErrorMessage error={data} />}
      {'mediaCredits' in data && 'id' in data.mediaCredits && (
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-8">
            <Heading level={2}>
              Cast &nbsp;
              <span className="font-light text-tertiary-dark">
                {data.mediaCredits.cast.length}
              </span>
            </Heading>
            <div className="flex flex-col gap-6">
              {data.mediaCredits.cast.length > 0 && data.mediaCredits.cast.map(castMember => (
                <div 
                  key={`${castMember.credit_id}-${castMember.name}`} 
                  className="flex items-center gap-4"
                >
                  <Image 
                    src={castMember.profile_path} 
                    alt={castMember.name} 
                    containerClassName="h-20 w-15 rounded-md"
                  />
                  <div>
                    <Link 
                      to={`/person/${castMember.id}`}
                      className="underline font-semibold hover:text-primary-light transition-all duration-300"
                    >
                      {castMember.name}
                    </Link>
                    <Paragraph>
                      {isCast(castMember) && castMember.character}
                      {isAggregateCast(castMember) && castMember.roles.length > 0 && castMember.roles[0].character}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
            {data.mediaCredits.cast.length === 0 && (
              <Paragraph>No cast information available.</Paragraph>
            )}
          </div>
          <div>
            <Heading level={2}>
              Crew &nbsp;
              <span className="font-light text-tertiary-dark">
                {data.mediaCredits.crew.length}
              </span>
            </Heading>
            <div>
              
            </div>
          </div>
        </div>
      )}
    </SubPageLayout>
  );
}

interface MediaDetailCastLoaderData {
  mediaCredits: MovieCredits | TvShowAggregateCredits | AppError;
  mediaDetail: MovieDetail | TvShowDetail | AppError;
}

export const loader = async function({ request, params }: LoaderFunctionArgs): Promise<MediaDetailCastLoaderData> {
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