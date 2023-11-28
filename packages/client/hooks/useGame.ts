import { useContext } from "react"
import { GameContext } from "../context/game"

export const useGame = () => {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("Context 'GameContext' was not provided!")
    }

    return context
}