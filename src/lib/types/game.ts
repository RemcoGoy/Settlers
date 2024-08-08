export enum Resource {
    wheat = "wheat",
    ore = "ore",
    brick = "brick",
    wood = "wood",
    wool = "wool",
    desert = "desert",
    sea = "sea"
}

export type Port = {
    resource: Resource | "generic",
    ratio: number
}

export type Tile = {
    type: Resource,
    number: number,
    hasRobber: boolean,
    coords: number[],
    port: Port | null
}

export type SettleSpot = {
    coords: number[][],
    playerId: string | null,
}

export type Player = {
    id: string,
    color: string,
    points: number
}

export type RoadData = {
    coords: number[][][],
    playerId: string | null
}

export interface GameState {
    tiles: Array<Tile>,
    settleSpots: Array<SettleSpot>,
    roads: Array<RoadData>,
    players: Player[],
    currentDice: number[];
}