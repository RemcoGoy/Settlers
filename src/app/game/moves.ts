import { GameState, SettleSpot } from "@/lib/types/game";
import { hasAdjecentRoads, hasAdjecentSettles, placeSettlement, rHasAdjecentRoad, rHasAdjecentSettle } from "@/lib/utils";
import { Move } from "boardgame.io";
import { INVALID_MOVE } from 'boardgame.io/core';

export const PlaceInitialSettlement: Move<GameState> = ({ G, ctx }, coords: number[][]) => {
    const settleSpot = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(coords));
    const currentPlayer = ctx.currentPlayer;

    if (settleSpot && settleSpot.playerId === null) {
        if (!hasAdjecentSettles(G, settleSpot)) {
            placeSettlement(G, settleSpot, currentPlayer);
        } else {
            return INVALID_MOVE;
        }
    } else {
        return INVALID_MOVE
    }
};

export const PlaceSettlement: Move<GameState> = ({ G, ctx }, coords: number[][]) => {
    const settleSpot = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(coords));
    const currentPlayer = ctx.currentPlayer;

    if (settleSpot && settleSpot.playerId === null) {
        if (!hasAdjecentSettles(G, settleSpot) && hasAdjecentRoads(G, settleSpot, currentPlayer)) {
            placeSettlement(G, settleSpot, currentPlayer);
        } else {
            return INVALID_MOVE;
        }
    } else {
        return INVALID_MOVE
    }
};

export const PlaceRoad: Move<GameState> = ({ G, ctx }, coords: number[][][]) => {
    const road = G.roads.find(r => JSON.stringify(r.coords) === JSON.stringify(coords));
    if (road && road.playerId === null) {
        if (rHasAdjecentSettle(G, road, ctx.currentPlayer) || rHasAdjecentRoad(G, road, ctx.currentPlayer)) {
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