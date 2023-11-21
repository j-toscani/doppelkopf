import { describe, expect, it } from "bun:test";
import { createGame } from "./createGame";
import { FIRST_ARRAY_INDEX } from "../constants";
import { Color, FULL_HAND_OF_CARDS_COUNT, Picture } from "shared";

const players = ["1", "2", "3", "4"]
const game = createGame(players)

describe("createGame", () => {
    it("References each hand by PlayerId", () => {
        for (const player of players) {
            const hand = game.hands[player];

            expect(hand).toBeDefined()
            expect(hand).toBeArray()
        }
    })

    it("Uses default order (10 of Hearts is highest card)", () => {
        const sortedCards = Object.values(game.hands).flat().sort((a,b) => b.order - a.order)

        expect(sortedCards[FIRST_ARRAY_INDEX].color).toBe(Color.Hearth)
        expect(sortedCards[FIRST_ARRAY_INDEX].picture).toBe(Picture.Ten)
    })

    it("Creates a game with an empty table", () => {
        const { table } = game;

        expect(table).toBeArray()
        expect(table).toBeEmpty()
    })

    it("Passes the same the number of cards to every player", () => {
        const hands = Object.values(game.hands);
        const firstHand = hands[FIRST_ARRAY_INDEX];

        expect(firstHand.length).toBe(FULL_HAND_OF_CARDS_COUNT)

        const allSameCount = hands.every(hand => hand.length === firstHand.length)
        expect(allSameCount).toBe(true)
    })
})