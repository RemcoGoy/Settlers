import { Resource, SettleSpot, Tile } from "@/types/game";
import { PlaceRoad, PlaceRobber, PlaceSettlement } from "./moves";

export const boardLayout = [
    { q: -1.5, r: -3, sea: true }, { q: -0.5, r: -3, sea: true }, { q: 0.5, r: -3, sea: true }, { q: 1.5, r: -3, sea: true },
    { q: -2, r: -2, sea: true }, { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2, sea: true },
    { q: -2.5, r: -1, sea: true }, { q: -1.5, r: -1 }, { q: -0.5, r: -1 }, { q: 0.5, r: -1 }, { q: 1.5, r: -1 }, { q: 2.5, r: -1, sea: true },
    { q: -3, r: 0, sea: true }, { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 }, { q: 3, r: 0, sea: true },
    { q: -2.5, r: 1, sea: true }, { q: -1.5, r: 1 }, { q: -0.5, r: 1 }, { q: 0.5, r: 1 }, { q: 1.5, r: 1 }, { q: 2.5, r: 1, sea: true },
    { q: -2, r: 2, sea: true }, { q: -1, r: 2 }, { q: 0, r: 2 }, { q: 1, r: 2 }, { q: 2, r: 2, sea: true },
    { q: -1.5, r: 3, sea: true }, { q: -0.5, r: 3, sea: true }, { q: 0.5, r: 3, sea: true }, { q: 1.5, r: 3, sea: true }
];

function generateBoard() {
    let resource_options = new Map([
        ['wheat', 4],
        ['ore', 3],
        ['brick', 3],
        ['wood', 4],
        ['wool', 4],
        ['desert', 1]
    ]);

    let value_options = new Map([
        [2, 1],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 2],
        [8, 2],
        [9, 2],
        [10, 2],
        [11, 2],
        [12, 1]
    ])

    const map: Tile[] = [];

    for (let i = 0; i < boardLayout.length; i++) {
        if (boardLayout[i].sea !== true) {
            let tile_data: Tile | null = null;

            const resource_items = Array.from(resource_options);
            const selection = resource_items[Math.floor(Math.random() * resource_items.length)];

            const resource = selection[0];
            const remaining = selection[1];

            if (remaining - 1 > 0) {
                resource_options.set(resource, remaining - 1);
            } else {
                resource_options.delete(resource);
            }

            if (resource !== 'desert') {
                const value_items = Array.from(value_options);
                const value_selection = value_items[Math.floor(Math.random() * value_items.length)];

                const value = value_selection[0];
                const value_remaining = value_selection[1];

                if (value_remaining - 1 > 0) {
                    value_options.set(value, value_remaining - 1)
                } else {
                    value_options.delete(value)
                }

                tile_data = {
                    type: resource as Resource,
                    number: value,
                    hasRobber: false,
                    coords: Object.values(boardLayout[i])
                }
            } else {
                tile_data = { type: 'desert', hasRobber: true, coords: Object.values(boardLayout[i]) } as Tile;
            }

            map.push(tile_data ?? {} as Tile);
        } else {
            map.push({
                type: 'sea' as Resource,
                hasRobber: false,
                coords: Object.values(boardLayout[i])
            } as Tile)
        }
    }

    return map
}

function generateSettleSpots() {
    const settleSpots: SettleSpot[] = [];

    for (let i = 0; i < boardLayout.length; i++) {
        const hex = boardLayout[i];

        if (hex.sea !== true) {
            const spot_N = [[hex.q - 0.5, hex.r - 1], [hex.q + 0.5, hex.r - 1], [hex.q, hex.r]];
            if (settleSpots.findIndex(x => JSON.stringify(x.coords) === JSON.stringify(spot_N)) === -1) {
                settleSpots.push({
                    coords: spot_N,
                    playerId: null,
                });
            }

            const spot_S = [[hex.q, hex.r], [hex.q - 0.5, hex.r + 1], [hex.q + 0.5, hex.r + 1]];
            if (settleSpots.findIndex(x => JSON.stringify(x.coords) === JSON.stringify(spot_S)) === -1) {
                settleSpots.push({
                    coords: spot_S,
                    playerId: null,
                });
            }

            const spot_NW = [[hex.q - 0.5, hex.r - 1], [hex.q - 1, hex.r], [hex.q, hex.r]];
            if (settleSpots.findIndex(x => JSON.stringify(x.coords) === JSON.stringify(spot_NW)) === -1) {
                settleSpots.push({
                    coords: spot_NW,
                    playerId: null,
                });
            }

            const spot_SW = [[hex.q - 1, hex.r], [hex.q, hex.r], [hex.q - 0.5, hex.r + 1]];
            if (settleSpots.findIndex(x => JSON.stringify(x.coords) === JSON.stringify(spot_SW)) === -1) {
                settleSpots.push({
                    coords: spot_SW,
                    playerId: null,
                });
            }

            const spot_NE = [[hex.q + 0.5, hex.r - 1], [hex.q, hex.r], [hex.q + 1, hex.r]];
            if (settleSpots.findIndex(x => JSON.stringify(x.coords) === JSON.stringify(spot_NE)) === -1) {
                settleSpots.push({
                    coords: spot_NE,
                    playerId: null,
                });
            }

            const spot_SE = [[hex.q, hex.r], [hex.q + 1, hex.r], [hex.q + 0.5, hex.r + 1]];
            if (settleSpots.findIndex(x => JSON.stringify(x.coords) === JSON.stringify(spot_SE)) === -1) {
                settleSpots.push({
                    coords: spot_SE,
                    playerId: null,
                });
            }
        }
    }

    return settleSpots;
}

export const SettlersGame = {
    setup: () => ({
        settleSpots: generateSettleSpots(), tiles: generateBoard(), players: {
            '0': {
                color: 'blue'
            },
            '1': {
                color: 'red'
            }
        },
        currentDice: [0, 0]
    }),

    phases: {
        settle: {
            moves: {
                PlaceSettlement,
                PlaceRobber
            },
            start: true,
            next: 'play'
        },

        play: {
            moves: {
                PlaceSettlement,
                PlaceRoad,
                PlaceRobber
            },
        }
    }
};
