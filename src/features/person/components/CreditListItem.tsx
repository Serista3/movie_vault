// --- IMPORTS ---
import type { 
  CreditCastMember, 
  CreditCrewMember, 
  AggregateCreditsCastMember, 
  AggregateCreditsCrewMember 
} from "@/@types"
import { 
  isCreditCastMember, 
  isCreditCrewMember, 
  isAggregateCreditsCastMember, 
  isAggregateCreditsCrewMember 
} from "@/guards"
import { Paragraph, Image, Anchor } from "@/components/common"

// --- TYPE DEFINATIONS ---
interface CreditListItemProps {
  credit: CreditCastMember | CreditCrewMember | AggregateCreditsCastMember | AggregateCreditsCrewMember
}

export default function CreditListItem({ credit }: CreditListItemProps) {
  return (
    <div className="flex items-center gap-4">
      <Image src={credit.profile_path} alt={credit.name} containerClassName="h-20 sm:h-22 w-15 sm:w-17 flex-none rounded-md"/>
      <div>
        <Anchor to={`/person/${credit.id}`} className="underline">
          {credit.name}
        </Anchor>
        <Paragraph>
          {isCreditCastMember(credit) && credit.character}
          {isCreditCrewMember(credit) && credit.job}
          {isAggregateCreditsCastMember(credit) && credit.roles.length > 0 && credit.roles[0].character}
          {isAggregateCreditsCrewMember(credit) && credit.jobs.length > 0 && credit.jobs[0].job}
        </Paragraph>
      </div>
    </div>
  )
}