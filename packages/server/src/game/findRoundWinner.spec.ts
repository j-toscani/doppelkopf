import { describe, expect, test } from "bun:test";
import { createCard } from "./cards";
import { Color, Picture } from "shared";
import { findRoundWinner } from "./findRoundWinner";
import { applyOrder } from "./orders/utils";
import { defaultOrder } from "./orders";

const COPY = '1'
const players = ['1', '2', '3', '4']

describe("Find the Round Winner", () => {
    test("Highest fehl wins in non trump round", () => {
        const cards = [
            createCard(COPY, Color.Club, Picture.Ten),
            createCard(COPY, Color.Club, Picture.Ten),
            createCard(COPY, Color.Club, Picture.Ace),
            createCard(COPY, Color.Club, Picture.King),
        ]
        const orderedRound = applyOrder(cards, defaultOrder)
        const tableRound = players.map((player, index) => ({from: player, card: orderedRound[index]!}) )
        const winner = findRoundWinner(tableRound)

        expect(winner).toBe('3')
    })

    test("Only considers correct fehl color in fehl round", () => {
        const cards = [
            createCard(COPY, Color.Spade, Picture.Ten),
            createCard(COPY, Color.Club, Picture.Ten),
            createCard(COPY, Color.Club, Picture.Ace),
            createCard(COPY, Color.Club, Picture.King),
        ]
        const orderedRound = applyOrder(cards, defaultOrder)
        const tableRound = players.map((player, index) => ({from: player, card: orderedRound[index]!}) )
        const winner = findRoundWinner(tableRound)

        expect(winner).toBe('1')
    })

    test("Highest trump wins in pure trump round", () => {
        const cards = [
            createCard(COPY, Color.Hearth, Picture.Jack),
            createCard(COPY, Color.Club, Picture.Jack),
            createCard(COPY, Color.Spade, Picture.Queen),
            createCard(COPY, Color.Club, Picture.Queen),
        ]
        const orderedRound = applyOrder(cards, defaultOrder)
        const tableRound = players.map((player, index) => ({from: player, card: orderedRound[index]!}) )
        const winner = findRoundWinner(tableRound)

        expect(winner).toBe('4')
    })

    test("Highest trump wins in mixed round", () => {
        const cards = [
            createCard(COPY, Color.Hearth, Picture.Ace),
            createCard(COPY, Color.Spade, Picture.Queen),
            createCard(COPY, Color.Club, Picture.Jack),
            createCard(COPY, Color.Club, Picture.Ten),
        ]
        const orderedRound = applyOrder(cards, defaultOrder)
        const tableRound = players.map((player, index) => ({from: player, card: orderedRound[index]!}) )
        const winner = findRoundWinner(tableRound)

        expect(winner).toBe('2')
    })
})