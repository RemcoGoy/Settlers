import { GameState } from "@/lib/types/game";
import { PlaceRoad, PlaceRobber, PlaceSettlement, RollDice } from "./moves";
import { generateBoard, generateRoads, generateSettleSpots } from "@/lib/helpers/generate";

export const SettlersGame = {
    setup: () => ({
        players: [{ id: '0', color: 'blue', points: 0 }, { id: '1', color: 'red', points: 0 }],
        currentDice: [0, 0],
        tiles: generateBoard(),
        settleSpots: generateSettleSpots(),
        roads: generateRoads()
    }),

    phases: {
        initialSettle: {
            moves: {
                PlaceSettlement,
                PlaceRoad
            },
            start: true,
            next: 'play',
            endIf: ({ G }: { G: GameState }) => G.players.every(p => p.points === 2)
        },

        play: {
            moves: {
                PlaceSettlement,
                PlaceRoad,
                PlaceRobber,
                RollDice
            },
        }
    }
};
