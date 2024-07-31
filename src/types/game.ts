export enum Resource {
    wheat = "wheat",
    ore = "ore",
    brick = "brick",
    wood = "wood",
    wool = "wool",
}

export type Tile = {
    type: Resource
}

export type GameState = {
    tiles: Array<Tile>
}
