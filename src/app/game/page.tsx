'use client'

import { Client } from 'boardgame.io/react';

export const SettlersGame = {
    setup: () => ({ cells: Array(9).fill(null) }),

    moves: {
        clickCell: ({ G, playerID }: { G: any, playerID: any }, id: any) => {
            G.cells[id] = playerID;
        },
    },
};

const App = Client({ game: SettlersGame });

export default App;