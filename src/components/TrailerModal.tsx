import { memo } from "react";

import Modal from "./common/Modal";
import Iframe from "./common/Iframe";

import type { MediaSummary } from "../types/media";

export default memo(function TrailerModal({ selectTrailer }: { selectTrailer: MediaSummary | null }) {
  const videoSrc = selectTrailer && 'trailerKey' in selectTrailer ? `https://www.youtube.com/embed/${selectTrailer.trailerKey}?autoplay=1` : null;

  return (
    <Modal className="flex flex-col justify-center items-start max-w-96 w-full bg-back-dark">
        <div className="text-white-light text-xl font-semibold py-4 px-4">Play Trailer</div>
        <Iframe
            title="Video Trailer"
            key={selectTrailer?.id ?? 'no-trailer'}
            src={videoSrc}
        >
        </Iframe>
    </Modal>
  )
})