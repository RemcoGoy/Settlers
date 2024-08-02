import { GameState } from "@/types/game";

export function PlaceSettlement({G, playerID}: {G: GameState, playerID: any}, rowId: number, colId: number) {
    console.log(`Player ${playerID} is settling on ${rowId},${colId}`);
}

export function PlaceRoad({G, playerID}: {G: GameState, playerID: any}) {
    console.log(`Player ${playerID} is building a road`);
}

export function PlaceRobber({G, playerID}: {G: GameState, playerID: any}, tileId: number) {
    const oldRobberTile = G.tiles.find(tile => tile.hasRobber);
    if (oldRobberTile) {
        const oldRobberIndex = G.tiles.indexOf(oldRobberTile);
        G.tiles[oldRobberIndex].hasRobber = false;
    }

    G.tiles[tileId].hasRobber = true;
}