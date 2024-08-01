export enum Resource {
    wheat = "wheat",
    ore = "ore",
    brick = "brick",
    wood = "wood",
    wool = "wool",
    desert = "desert"
}

export enum Direction {
    N = "N",
    S = "S",
    NE = "NE",
    SE = "SE",
    NW = "NW",
    SW = "SW"
}

export type SettleSpot = {
    direction: Direction
}

export type Tile = {
    type: Resource,
    number: number,
    settleSpots: {[key in Direction]: SettleSpot | null}
}

export type GameState = {
    tiles: Array<Tile>
}
