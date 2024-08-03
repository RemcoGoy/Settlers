import { GameState } from "@/types/game";
import { INVALID_MOVE } from 'boardgame.io/core';

export function PlaceSettlement({ G, playerID }: { G: GameState, playerID: any }, coords: number[][]) {
    const settleSpot = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(coords));

    if (settleSpot && settleSpot.playerId === null) {
        settleSpot.playerId = playerID;
    } else {
        return INVALID_MOVE
    }
}

export function PlaceRoad({ G, playerID }: { G: GameState, playerID: any }) {
    console.log(`Player ${playerID} is building a road`);
}

export function PlaceRobber({ G, playerID }: { G: GameState, playerID: any }, tileId: number) {
    const oldRobberTile = G.tiles.find(tile => tile.hasRobber);
    if (oldRobberTile) {
        const oldRobberIndex = G.tiles.indexOf(oldRobberTile);
        G.tiles[oldRobberIndex].hasRobber = false;
    }

    G.tiles[tileId].hasRobber = true;
}