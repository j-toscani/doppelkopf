import { OrderedCard } from 'shared';
import { getHand as getHandRequest } from '@/requests';

export const getHand = (gameId: string, playerId: string): Promise<Array<OrderedCard>> =>
	getHandRequest(gameId, playerId).then(({ hand }) => hand);
