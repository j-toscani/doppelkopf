import { redirect } from "next/navigation";

export const useGameId = (params: Record<string, string | string[]>) => {
    const { gameId }= params;
    if (!gameId || Array.isArray(gameId)) {
        redirect('/game')
    }

    return { gameId }
}