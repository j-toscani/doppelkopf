import { request } from "@/utils/request"
import { Game, OrderedCard, User } from "shared"

export const createGame = (user: string) => request<{game: Game }>('/games/new', {
	method: 'PUT',
	input: [user, '2', '3', '4']
}) 

export const createUser = (name: string) => request<{ user: User }>('/users/new', {
	input: {name},
	method: 'PUT'
})

export const getGames = () => request<{games: Array<Game>}>('/games')

export const getHand = (gameId: string, playerId: string) => request<{ hand: Array<OrderedCard>}>(`/games/${gameId}/hand`, {
	query: {
		player: playerId
	}
})

export const loginUser = (name: string) => request<{ user: User | null }>('/login', {
	method: 'POST',
	input: { name }
})