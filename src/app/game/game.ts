import { Direction, GameState, Resource, Tile } from "@/types/game";
import { PlaceInitialSettlement, PlaceRoad, PlaceSettlement } from "./moves";

const values = Object.keys(Resource);

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

    for (let i = 0; i < 19; i++) {
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
                settleSpots: {
                   [Direction.N]: null,
                   [Direction.S]: null,
                   [Direction.NE]: null,
                   [Direction.SE]: null,
                   [Direction.NW]: null,
                   [Direction.SW]: null,
                }
            }
        } else {
            tile_data = { type: 'desert' } as Tile;
        }

        map.push(tile_data ?? {} as Tile);
    }

    return map
}

export const SettlersGame = {
    setup: () => ({ tiles: generateBoard() }),

    phases: {
        settle: {
            moves: {
                PlaceInitialSettlement
            },
            start: true,
            next: 'play'
        },

        play: {
            moves: {
                PlaceSettlement,
                PlaceRoad
            },
        }
    }
};
