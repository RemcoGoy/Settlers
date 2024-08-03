import { GameState } from "@/types/game";
import { Move } from "boardgame.io";
import { INVALID_MOVE } from 'boardgame.io/core';

export const PlaceSettlement: Move<GameState> = ({G, ctx}, coords: number[][]) => {
    const settleSpot = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(coords));
    const playerID = ctx.currentPlayer;

    if (settleSpot && settleSpot.playerId === null) {
        settleSpot.playerId = playerID;
    } else {
        return INVALID_MOVE
    }
};

export const PlaceRoad: Move<GameState> = ({G, ctx}) => {
    console.log(`Player ${ctx.currentPlayer} is building a road`);
};

export const PlaceRobber: Move<GameState> = ({G, ctx}, tileId: number) => {
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

export const RollDice: Move<GameState> = ({ G, ctx }) => {};