import type { MovieDetail, TvShowDetail } from "../../../@types"

import Heading from "../../../components/common/typography/Heading"
import Paragraph from "../../../components/common/typography/Paragraph"
import Image from "../../../components/common/display/Image"

interface MediaStatsProps {
  mediaDetail: MovieDetail | TvShowDetail;
}

export default function MediaStats({ mediaDetail }: MediaStatsProps){
  return (
    <div className="bg-gray-dark rounded-[10px] p-4">
      <ul className="flex flex-col gap-4">
        {'original_title' in mediaDetail && (
          <li>
            <div>
              <Heading level={4} className="mb-1">Original Title</Heading>
              <Paragraph>{mediaDetail.original_title}</Paragraph>
            </div>
          </li>
        )}
        {'original_name' in mediaDetail && (
          <li>
            <div>
              <Heading level={4} className="mb-1">Original Name</Heading>
              <Paragraph>{mediaDetail.original_name}</Paragraph>
            </div>
          </li>
        )}
        <li>
          <div>
            <Heading level={4} className="mb-1">Status</Heading>
            <Paragraph>{mediaDetail.status}</Paragraph>
          </div>
        </li>
        {'networks' in mediaDetail && (
          <li>
            <div>
              <Heading level={4} className="mb-1">Networks</Heading>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
                {mediaDetail.networks.map(network => (
                  <Image 
                    key={network.id} 
                    src={network.logo_path} 
                    alt={network.name} 
                    containerClassName="w-20 inline-block mr-2 mb-2 rounded-none shadow-none"
                  />
                ))}
              </div>
            </div>
          </li>
        )}
        {'budget' in mediaDetail && (
          <li>
            <div>
              <Heading level={4} className="mb-1">Budget</Heading>
              <Paragraph>${mediaDetail.budget.toLocaleString()}</Paragraph>
            </div>
          </li>
        )}
        {'revenue' in mediaDetail && (
          <li>
            <div>
              <Heading level={4} className="mb-1">Revenue</Heading>
              <Paragraph>${mediaDetail.revenue.toLocaleString()}</Paragraph>
            </div>
          </li>
        )}
        {'type' in mediaDetail && (
          <li>
            <div>
              <Heading level={4} className="mb-1">Type</Heading>
              <Paragraph>{mediaDetail.type}</Paragraph>
            </div>
          </li>
        )}
        <li>
          <div>
            <Heading level={4} className="mb-1">Original Language</Heading>
            <Paragraph>{mediaDetail.original_language}</Paragraph>
          </div>
        </li>
      </ul>
    </div>
  )
}