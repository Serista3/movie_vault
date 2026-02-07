// --- REACT ---
import { memo } from "react";

// --- COMPONENTS ---
import Modal from "./common/Modal";
import Iframe from "./common/Iframe";
import Heading from "./common/Heading";

// --- TYPES ---
import type { MediaVideo } from "../types/media";

export default memo(function TrailerModal({ selectTrailer }: { selectTrailer: MediaVideo }) {
  // --- VIDEO SOURCE URL ---
  const videoSrc = selectTrailer ? `https://www.youtube.com/embed/${selectTrailer.key}?autoplay=1` : null;

  return (
    <Modal className="flex flex-col justify-center items-start max-w-96 w-full bg-secondary-dark">
        {/* --- MODAL HEADING --- */}
        <Heading level={3} className="py-4 px-4">Play Trailer</Heading>

        {/* --- IFRAME FOR TRAILER VIDEO --- */}
        <Iframe
            title="Video Trailer"
            key={selectTrailer?.id ?? 'no-trailer'}
            src={videoSrc}
        >
        </Iframe>
    </Modal>
  )
})