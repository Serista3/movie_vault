// --- ROUTER ---
import { Link } from "react-router";

// --- COMPONENTS ---
import Card from './common/Card'
import Image from "./common/Image"
import Heading from "./common/Heading";
import Paragraph from "./common/Paragraph"

// --- HELPERS ---
import { cn } from "../utils/helperClassName";
import { displayMediaSubtitle } from "../utils/helperMedia";
import { getPersonSummaryData } from "../utils/helperPerson";

// --- TYPES ---
import type { PersonSummary, CreditCastMember, CreditCrewMember } from "../types"

// --- TYPES FOR PERSON CARD PROPS ---
interface PersonCardProps {
  person: PersonSummary | CreditCastMember | CreditCrewMember;
  className?: string;
}

export default function PersonCard({ person, className }: PersonCardProps) {
    // --- EXTRACT PERSON DATA ---
  const { personImg, personName, personSubtitle } = getPersonSummaryData(person);

  // --- COMPUTED CLASS NAME ---
  const wrapperClass = cn(
    `flex flex-col items-start w-40 hover:scale-102 transition-all duration-300
    bg-secondary-dark place-self-stretch`, 
    className
);

    return (
    <Card className={wrapperClass}>
        {/* --- PERSON IMAGE --- */}
        <Link to={`/person/${person.id}`} className="w-full h-full absolute top-0 left-0 z-2"></Link>
        <Image 
            containerClassName="h-55 rounded-b-none"
            src={personImg} 
            alt={`Image of ${personName}`}
        />

        {/* --- PERSON INFO --- */}
        <div className="flex flex-col gap-1.25 p-4 w-full">
            <Heading level={3} className="z-3 line-clamp-1"> 
                {personName}
            </Heading>
            <Paragraph className="text-tertiary-dark line-clamp-2 leading-5 z-3">
                {displayMediaSubtitle(personSubtitle)}
            </Paragraph>
        </div>
    </Card>
    )
}