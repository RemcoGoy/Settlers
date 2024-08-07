import { TurnOrder } from 'boardgame.io/core';
import { GameState } from "@/lib/types/game";
import { PlaceInitialRoad, PlaceInitialSettlement, PlaceRoad, PlaceRobber, PlaceSettlement, RollDice } from "./moves";
import { createSymmetricArray, generateBoard, generatePlayers, generateRoads, generateSettleSpots } from "@/lib/helpers/generate";

const NUMBER_OF_PLAYERS = 4;

export const SettlersGame = {
    setup: () => ({
        players: generatePlayers(NUMBER_OF_PLAYERS),
        currentDice: [0, 0],
        tiles: generateBoard(),
        settleSpots: generateSettleSpots(),
        roads: generateRoads()
    }),

    phases: {
        initialSettle: {
            moves: {
                PlaceInitialSettlement,
                PlaceInitialRoad
            },

            turn: {
                order: TurnOrder.CUSTOM(createSymmetricArray(NUMBER_OF_PLAYERS)) // TODO: Make dynamic
            },

            start: true,
            next: 'play',
            endIf: ({ G }: { G: GameState }) => {
                let allPlayers2Roads = true;

                for (const p of G.players) {
                    const playerRoads = G.roads.filter(r => r.playerId === p.id);

                    if (playerRoads.length !== 2) {
                        allPlayers2Roads = false
                    }
                }

                return G.players.every(p => p.points === 2) && allPlayers2Roads
            },
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
