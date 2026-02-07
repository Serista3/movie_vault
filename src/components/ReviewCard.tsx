// --- TYPES ---
import type { ReviewSummary } from "../types"

// --- COMPONENTS ---
import Heading from "./common/Heading"
import Paragraph from "./common/Paragraph"
import Image from "./common/Image"

// --- ICONS ---
import { FaStar } from "react-icons/fa"

// --- HELPERS ---
import { cn } from "../utils/helperClassName"
import { formatDateToReadable } from "../utils/formatters"

// --- TYPES FOR REVIEW CARD PROPS ---
interface ReviewCardProps {
    review: ReviewSummary;
    className?: string;
}

export default function ReviewCard({ review, className }: ReviewCardProps) {
    // --- REVIEW DATA ---
    const authorAvatarUrl = review.author_details.avatar_path;
    const authorName = review.author;
    const rating = review.author_details.rating;
    const createdAt = review.created_at;
    const content = review.content;

    return (
        <div className={cn("p-4 bg-secondary-dark shadow-2xl rounded-[10px]", className)}>
            <div className="flex items-center gap-3 mb-2">
                <div className="user-review w-full flex items-center gap-3 mb-2 border-b border-gray-dark pb-6">
                    {/* --- AUTHOR AVATAR */}
                    <Image 
                        src={authorAvatarUrl} 
                        alt={`${authorName}'s avatar`}
                        containerClassName="w-11 rounded-full"
                    />

                    {/* --- AUTHOR INFO --- */}
                    <div className="flex flex-col gap-1">
                        <Heading level={3}>
                            {authorName}
                        </Heading> 
                        {rating !== null && (
                            <div className="flex items-center gap-2">
                                {/* --- REVIEW RATING --- */}
                                <div className="flex items-center py-0.5 px-1.5 rounded-md bg-primary-light text-secondary-light w-max text-sm">
                                    <FaStar className="inline-block mr-1 text-secondary-light" />
                                    {rating * 10}%
                                </div>

                                {/* --- REVIEW DATE --- */}
                                <Paragraph className="text-sm text-tertiary-dark">
                                    Written on {formatDateToReadable(createdAt)}
                                </Paragraph>
                            </div>                
                        )}
                    </div>
                </div>
            </div>

            {/* --- REVIEW CONTENT --- */}
            <Paragraph className="line-clamp-5">{content}</Paragraph>
        </div>
    )
}