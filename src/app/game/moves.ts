import { GameState } from "@/types/game";

export function PlaceSettlement({G, playerID}: {G: GameState, playerID: any}, cellId: number) {
    console.log(`Player ${playerID} is settling on ${cellId}`);
}

export function PlaceRoad({G, playerID}: {G: GameState, playerID: any}) {
    console.log(`Player ${playerID} is building a road`);
}

export function PlaceInitialSettlement({G, playerID}: {G: GameState, playerID: any}, cellId: number) {
    PlaceSettlement({G, playerID}, cellId);
    PlaceRoad({G, playerID});
}