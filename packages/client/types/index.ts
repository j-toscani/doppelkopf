export type ParamProps<T extends Record<string, string>> = {
    params: T
}

export type LobbyParams = {
    gameId?: string
}