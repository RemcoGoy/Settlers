import React from "react";
import { GameState } from "@/types/game";
import { HexGrid, Layout, Hexagon, GridGenerator } from "react-hexgrid"


export function SettlersBoard({ ctx, G, moves }: { ctx: any, G: GameState, moves: any }) {
    const hexagons = GridGenerator.hexagon(2);

    return (
        <div className="gameContainer">
            <HexGrid width={850} height={850}>
                <Layout flat={false} spacing={1.02}>
                    {hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />)}
                </Layout>
            </HexGrid>
        </div>
    )
}