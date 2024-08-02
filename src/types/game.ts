export enum Resource {
    wheat = "wheat",
    ore = "ore",
    brick = "brick",
    wood = "wood",
    wool = "wool",
    desert = "desert"
}

export type Tile = {
    type: Resource,
    number: number,
    hasRobber: boolean,
    coords: number[]
}

export type SettleSpot = {
    coords: number[][],
    playerId: number | null
}

export type GameState = {
    tiles: Array<Tile>,
    settleSpots: Array<SettleSpot>
}
