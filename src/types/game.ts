export enum Resource {
    wheat = "wheat",
    ore = "ore",
    brick = "brick",
    wood = "wood",
    wool = "wool",
    desert = "desert",
    sea = "sea"
}

export type Tile = {
    type: Resource,
    number: number,
    hasRobber: boolean,
    coords: number[]
}

export type SettleSpot = {
    coords: number[][],
    playerId: string | null,
}

export interface GameState {
    tiles: Array<Tile>,
    settleSpots: Array<SettleSpot>,
    players: {
        [key: string]: {
            color: string;
        };
    };
    currentDice: number[];
}