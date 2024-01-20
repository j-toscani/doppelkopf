import { getGames as getGamesRequest } from '@/requests';

export const getGames = () => getGamesRequest().catch(() => ({ games: [] }));
