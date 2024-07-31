import { Resource, Tile } from "@/types/game";

const values = Object.keys(Resource);

function generateBoard() {
    let options = new Map([
        ['wheat', 4],
        ['ore', 3],
        ['brick', 3],
        ['wood', 4],
        ['wool', 4],
        ['desert', 1]
    ]);

    const map: Tile[] = [];

    for (let i = 0; i < 19; i++) {
        const items = Array.from(options);
        const selection = items[Math.floor(Math.random() * items.length)];

        const val = selection[1];

        if (val - 1 > 0) {
            options.set(selection[0], selection[1] - 1);
        } else {
            options.delete(selection[0]);
        }
        
        map.push({
            type: selection[0],
        } as Tile);
    }

    return map
}

export const SettlersGame = {
    setup: () => ({ tiles: generateBoard() }),

    moves: {
        // clickCell: ({ G, playerID }: { G: GameState, playerID: any }, id: any) => {
        //     G.tiles[id] = playerID;
        // },
    },
};
