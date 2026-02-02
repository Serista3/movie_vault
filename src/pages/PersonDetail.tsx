import { type LoaderFunctionArgs, useLoaderData, Link } from "react-router"
import { getPerson, getPersonCombinedCredits } from "../services/people.service";
import type { PersonDetail, PersonCombinedCredits, AppError } from "../types";
import { getActingData } from "../utils/helperPerson";

import ExplorerLayout from "../components/layout/ExplorerLayout";
import ErrorMessage from "../components/common/ErrorMessage";
import Image from "../components/common/Image";
import Heading from "../components/common/Heading";
import Paragraph from "../components/common/Paragraph";
import MediaGrid from "../components/media/MediaGrid";
import PersonInfo from "../components/PersonInfo";

export default function PersonDetail(){
  const data = useLoaderData<PersonDetail & PersonCombinedCredits | AppError>();
  const actingData = getActingData(data);

  return (
    <>
      {'isError' in data && <ErrorMessage error={data} />}
      {'id' in data && (
        <ExplorerLayout title={data.name}>
          <div className="mt-4 flex flex-col items-center justify-center gap-13">
            <Image src={data.profile_path} alt={data.name} containerClassName="h-90 mx-auto" />
            <PersonInfo data={data} />
            <div className="person-detail flex flex-col gap-5 w-full">
              <Heading level={2}>{data.name}</Heading>
              <div className="detail flex flex-col gap-10">
                <div className="biography flex flex-col gap-3">
                  <Heading level={3}>Biography</Heading>
                  <Paragraph>
                    {data.biography || 'Biography not available.'}
                  </Paragraph>
                </div>
                <div className="known-for flex flex-col gap-3">
                  <Heading level={3}>Known For</Heading>
                  <MediaGrid mediaList={data.cast} variant="horizontal" limit={10} />
                </div>
                <div className="acting flex flex-col gap-3">
                  <Heading level={3}>{data.known_for_department}</Heading>
                  <div className="p-6 flex flex-col rounded-[10px] bg-tertiary-light text-secondary-light">
                    {actingData.length > 0 && (
                      actingData.map(acting => (
                        <div 
                          key={acting.year} 
                          className="pb-6 mb-3 not-last:border-b border-gray-light last:mb-0 flex items-start gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <Heading level={4} className="font-normal">{acting.year}</Heading>
                            <hr className="w-10 h-0.5 text-gray-dark" />
                          </div>
                          
                          <div>
                            {acting.credits.map(credit => (
                              <div key={credit.credit_id}>                
                                <Link 
                                  to={`/${'title' in credit ? 'movie' : 'tv'}/${credit.id}`}
                                  className="hover:text-primary-dark transition-all font-semibold line-clamp-1"
                                >
                                  { 'title' in credit ? credit.title : credit.name }
                                </Link>
                                <Paragraph className="mb-2">
                                  as { 'character' in credit && credit.character ? credit.character : '-'}
                                </Paragraph>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                    {actingData.length === 0 && (
                      <Paragraph>
                        No {data.known_for_department} credits available.
                      </Paragraph>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ExplorerLayout>
      )}
    </>
  )
}

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