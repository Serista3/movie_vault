// --- IMPORTS ---
import type { ActionFunctionArgs } from "react-router"
import type { MediaType } from "@/@types";
import { toggleFavorite, toggleWatchlist } from "@/services";

export const mediaDetailAction = async function({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const mediaId = formData.get("mediaId");
    const mediaType = formData.get("mediaType");
    const actionType = formData.get("actionType");
    const accountId = formData.get("accountId");

    if(!mediaId || !mediaType || !actionType || !accountId) return null;

    const params: { media_id: number; media_type: MediaType } = {
        media_id: Number(mediaId),
        media_type: mediaType.toString() as MediaType,
    }

    // --- PROCESS FLOW BASE ON ACTION TYPE ---
    if(actionType === 'toggleFavorite'){
        const isFavorite = formData.get("isFavorite");

        return toggleFavorite({
            ...params,
            favorite: isFavorite === 'true'
        }, Number(accountId));
    }

    if(actionType === 'toggleWatchlist'){
        const isWatchlist = formData.get("isWatchlist");

        return toggleWatchlist({
            ...params,
            watchlist: isWatchlist === 'true'
        }, Number(accountId));
    }
}