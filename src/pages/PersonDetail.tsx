// --- IMPORTS ---
import { type LoaderFunctionArgs, useLoaderData } from "react-router"
import { getPerson, getPersonCombinedCredits } from "@/services";
import type { PersonDetail, PersonCombinedCredits, AppError } from "@/@types";
import { isAppError } from "@/guards";
import { getActingData, getCrewData } from "@/utils/helper";
import { ExplorerLayout } from '@/components/layout';
import { ErrorMessage, Image, Heading, Paragraph } from "@/components/common";
import { MediaGrid } from "@/features/media";
import { PersonInfo, Filmography } from "@/features/person";

export default function PersonDetail(){
  const data = useLoaderData<PersonDetail & PersonCombinedCredits | AppError>();
  const actingData = getActingData(data);
  const crewData = getCrewData(data);

  return (
    <>
      {isAppError(data) && <ErrorMessage error={data} />}
      {'id' in data && (
        <ExplorerLayout title={data.name}>
          <div className="mt-4 flex flex-col items-center justify-center gap-13">
            {/* --- PERSON IMAGE --- */}
            <Image src={data.profile_path} alt={data.name} containerClassName="h-90 mx-auto" />

            {/* --- PERSON INFO --- */}
            <PersonInfo data={data} />

            {/* --- PERSON DETAIL --- */}
            <div className="person-detail flex flex-col gap-5 w-full">
              <Heading level={2}>{data.name}</Heading>
              <div className="detail flex flex-col gap-10">
                {/* --- PERSON BIOGRAPHY --- */}
                <div className="biography flex flex-col gap-3">
                  <Heading level={3}>Biography</Heading>
                  <Paragraph>
                    {data.biography || 'Biography not available.'}
                  </Paragraph>
                </div>

                {/* --- PERSON KNOWN FOR --- */}
                <div className="known-for flex flex-col gap-3">
                  <Heading level={3}>Known For</Heading>
                  <MediaGrid mediaList={data.cast} variant="horizontal" limit={10} />
                </div>

                {/* --- PERSON ACTING --- */}
                <div className="acting flex flex-col gap-3">
                  <Heading level={3}>Acting</Heading>
                  {actingData.length > 0 && (
                    <Filmography data={actingData} />
                  )}
                  {actingData.length === 0 && (
                    <Paragraph>
                      No acting credits available.
                    </Paragraph>
                  )}
                </div>

                {/* --- FILMOGRAPHY CREDIT --- */}
                {crewData.length > 0 && 
                  crewData.map(crew => (
                    <div key={`${crew.department}-${crew.credits.reduce((d,c) => d + c.credit_id, '')}`} className="acting flex flex-col gap-3">
                      <Heading level={3}>{crew.department}</Heading>
                      {crew.credits.length > 0 && (
                        <Filmography data={crew.credits} />
                      )}
                      {crew.credits.length === 0 && (
                        <Paragraph>
                          No {crew.department} credits available.
                        </Paragraph>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ExplorerLayout>
      )}
    </>
  )
}

// --- LOADER ---
export const loader = async function({ params }: LoaderFunctionArgs): Promise<PersonDetail & PersonCombinedCredits | AppError> {
  const { id } = params;
  const personId = id ? parseInt(id) : null;
  
  if (!personId) return { isError: true, message: 'Invalid person ID.', statusCode: 400 };
  const personData = await getPerson(personId);
  const creditsData = await getPersonCombinedCredits(personId);
  
  return {
    ...personData,
    ...creditsData,
  };
}