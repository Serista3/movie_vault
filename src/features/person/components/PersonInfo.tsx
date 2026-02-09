// --- IMPORTS ---
import type { PersonDetail, PersonCombinedCredits } from "@/@types"
import { getPersonInfo } from "@/utils/helper";
import { Heading, Paragraph } from "@/components/common"

// --- TYPE DEFINATIONS ---
interface PersonInfoProps {
  data: PersonDetail & PersonCombinedCredits;
}

export default function PersonInfo({ data }: PersonInfoProps) {
  const personInfo = getPersonInfo(data);

  return (
    <div className="person-info p-6 border border-gray-dark rounded-[10px] w-full max-w-2xl">
      {/* --- PERSON INFO HEADING --- */}
      <Heading level={2} className="flex justify-between items-center gap-6">
        <span className="shrink-0">Person Info</span>
        <hr className="w-full h-0.5 text-gray-dark" />
      </Heading>

      {/* --- PERSON INFO LIST --- */}
      <ul className="info-list mt-4 flex flex-col gap-8">
        {personInfo.map(info => (
          <li key={info.title} className="flex flex-col gap-1">
            <Heading level={3}>{info.title}</Heading>
            <Paragraph>{info.value}</Paragraph>
          </li>
        ))}
      </ul>
    </div>
  )
}