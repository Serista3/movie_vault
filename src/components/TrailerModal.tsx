import { memo } from "react";

import Modal from "./common/Modal";
import Iframe from "./common/Iframe";
import Heading from "./common/Heading";

import type { MediaSummary } from "../types/media";

export default memo(function TrailerModal({ selectTrailer }: { selectTrailer: MediaSummary | null }) {
  const videoSrc = selectTrailer && 'trailerKey' in selectTrailer ? `https://www.youtube.com/embed/${selectTrailer.trailerKey}?autoplay=1` : null;

  return (
    <Modal className="flex flex-col justify-center items-start max-w-96 w-full bg-secondary-dark">
        <Heading level={3} className="py-4 px-4">Play Trailer</Heading>
        <Iframe
            title="Video Trailer"
            key={selectTrailer?.id ?? 'no-trailer'}
            src={videoSrc}
        >
        </Iframe>
    </Modal>
  )
})