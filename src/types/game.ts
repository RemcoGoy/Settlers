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
    number: number
}

export type GameState = {
    tiles: Array<Tile>
}
