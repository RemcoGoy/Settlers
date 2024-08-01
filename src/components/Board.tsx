import React from "react";
import { GameState } from "@/types/game";
import { HexGrid, Layout, Hexagon, GridGenerator } from "react-hexgrid"


export function SettlersBoard({ ctx, G, moves }: { ctx: any, G: any, moves: any }) {
    const hexagons = GridGenerator.hexagon(3);

    return (
        <div className="gameContainer">
            <HexGrid width={900} height={900}>
                <Layout size={{ x: 8, y: 8 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
                    {hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} className={hex.state?.type} />)}
                </Layout>
            </HexGrid>
        </div>
    )
}