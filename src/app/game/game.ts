import { Resource, Tile } from "@/types/game";
import { PlaceRoad, PlaceRobber, PlaceSettlement } from "./moves";

export const boardLayout = [
    { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 },
    { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 }, { q: 2, r: -1 },
    { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 },
    { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 }, { q: 1, r: 1 },
    { q: -1, r: 2 }, { q: 0, r: 2 }, { q: 1, r: 2 }
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
                hasRobber: false
            }
        } else {
            tile_data = { type: 'desert', hasRobber: true } as Tile;
        }

        map.push(tile_data ?? {} as Tile);
    }

    return map
}

function generateSettleSpots() {
    return [
        {
            coords: [[-1,-2],[0,-2],[0,-1]]
        },
        {
            coords: [[0,-2], [0,-1], [1,-1]]
        }
    ]
}

export const SettlersGame = {
    setup: () => ({ settleSpots: generateSettleSpots(), tiles: generateBoard(),  }),

    phases: {
        settle: {
            moves: {
                PlaceSettlement,
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
