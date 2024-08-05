import { GameState, SettleSpot } from "@/lib/types/game";
import { isTopSettle } from "@/lib/utils";
import { Move } from "boardgame.io";
import { INVALID_MOVE } from 'boardgame.io/core';

export const PlaceSettlement: Move<GameState> = ({ G, ctx }, coords: number[][]) => {
    const settleSpot = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(coords));
    const playerID = ctx.currentPlayer;

    if (settleSpot && settleSpot.playerId === null) {
        // Check adjecent settles

        const adjecentSettles = [];

        if (isTopSettle(coords)) {
            const topCoords = [[settleSpot.coords[2][0], settleSpot.coords[2][1] - 2], settleSpot.coords[0], settleSpot.coords[1]];
            const topAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(topCoords));
            if (topAdjecent) {
                adjecentSettles.push(topAdjecent);
            }

            const leftCoords = [settleSpot.coords[0], [settleSpot.coords[1][0] - 1.5, settleSpot.coords[1][1] + 1], settleSpot.coords[2]];
            const leftAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(leftCoords));;
            if (leftAdjecent) {
                adjecentSettles.push(leftAdjecent);
            }

            const rightCoords = [settleSpot.coords[1], settleSpot.coords[2], [settleSpot.coords[0][0] + 1.5, settleSpot.coords[0][1] + 1]]
            const rightAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(rightCoords));;
            if (rightAdjecent) {
                adjecentSettles.push(rightAdjecent);
            }
        } else {
            const leftCoords = [[settleSpot.coords[2][0] - 1.5, settleSpot.coords[2][1] - 1], settleSpot.coords[0], settleSpot.coords[1]];
            const leftAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(leftCoords));;
            if (leftAdjecent) {
                adjecentSettles.push(leftAdjecent);
            }

            const rightCoords = [settleSpot.coords[0], [settleSpot.coords[1][0] + 1.5, settleSpot.coords[1][1] - 1], settleSpot.coords[2]];
            const rightAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(rightCoords));;
            if (rightAdjecent) {
                adjecentSettles.push(rightAdjecent);
            }

            const bottomCoords = [settleSpot.coords[1], settleSpot.coords[2], [settleSpot.coords[0][0], settleSpot.coords[0][1] + 2]];
            const bottomAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(bottomCoords));;
            if (bottomAdjecent) {
                adjecentSettles.push(bottomAdjecent);
            }
        }

        if (adjecentSettles.some(s => s.playerId !== null)) {
            return INVALID_MOVE;
        }

        settleSpot.playerId = playerID;
        const player = G.players.find(p => p.id === playerID);
        if (player) {
            player.points++;
        }
    } else {
        return INVALID_MOVE
    }
};

export const PlaceRoad: Move<GameState> = ({ G, ctx }, coords: number[][][]) => {
    const road = G.roads.find(r => JSON.stringify(r.coords) === JSON.stringify(coords));
    if (road && road.playerId === null) {
        // Check for adjecent settle
        let adjecentSettle = false;

        const adjecentSettles = [];
        for (const coord of coords) {
            const settle = G.settleSpots.find(s => JSON.stringify(coord) === JSON.stringify(s.coords));
            if (settle) {
                adjecentSettles.push(settle);
            }
        }

        if (adjecentSettles.some(s => s.playerId === ctx.currentPlayer)) {
            adjecentSettle = true;
        }

        // Check for adjecent road
        let adjecentRoad = false;

        for (const coord of coords) {
            const r = G.roads.filter(rx =>
                (JSON.stringify(rx.coords[0]) === JSON.stringify(coord)
                    || JSON.stringify(rx.coords[1]) === JSON.stringify(coord))
                && JSON.stringify(rx.coords) !== JSON.stringify(road.coords)
            );


            if (!adjecentRoad && r.some(r => r.playerId === ctx.currentPlayer)) {
                adjecentRoad = true;
            }
        }

        if (adjecentSettle || adjecentRoad) {
            road.playerId = ctx.currentPlayer;
        } else {
            return INVALID_MOVE;
        }
    } else {
        return INVALID_MOVE;
    }
    console.log(`Player ${ctx.currentPlayer} is building a road`);
};

export const PlaceRobber: Move<GameState> = ({ G, ctx }, tileId: number) => {
    const oldRobberTile = G.tiles.find(tile => tile.hasRobber);
    if (oldRobberTile) {
        oldRobberTile.hasRobber = false;
    } else {
        return INVALID_MOVE;
    }

    if (G.tiles[tileId].type === 'sea') {
        return INVALID_MOVE
    } else {
        G.tiles[tileId].hasRobber = true;
    }
};

export const RollDice: Move<GameState> = ({ G, ctx }) => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    G.currentDice = [d1, d2];
};