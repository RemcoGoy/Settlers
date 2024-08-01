import { GameState } from "@/types/game";
import React, { useEffect, useState } from "react";
import { Stage, Layer, RegularPolygon, Text } from 'react-konva';

interface HexagonProps {
    x: number;
    y: number;
    radius: number;
    fill?: string;
    text?: string;
}

const Hexagon: React.FC<HexagonProps> = ({ x, y, radius, fill, text }) => (
    <>
        <RegularPolygon
            x={x}
            y={y}
            sides={6}
            radius={radius}
            fill={fill}
            stroke={'black'}
            strokeWidth={2}
        />
        {text && <Text x={x} y={y} text={text} fontSize={14} align="center" verticalAlign="middle" />}
    </>
);

export function SettlersBoard({ ctx, G, moves }: { ctx: any, G: GameState, moves: any }) {
    const [hexagons, setHexagons] = useState<any[]>([]);

    useEffect(() => {
        const newBoard: HexagonProps[] = [];

        const radius = 70;
        const hexWidth = Math.sqrt(3) * radius;
        const hexHeight = 2 * radius;

        const boardLayout = [
            { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 },
            { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 }, { q: 2, r: -1 },
            { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 },
            { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 }, { q: 1, r: 1 },
            { q: -1, r: 2 }, { q: 0, r: 2 }, { q: 1, r: 2 }
        ];

        for (let i = 0; i < G.tiles.length; i++) {
            const coords = boardLayout[i];
            const tile = G.tiles[i];
            const resource = tile.type;

            const x = 500 + coords.q * hexWidth + (coords.r % 2) * hexWidth / 2;
            const y = 350 + coords.r * hexHeight * 3 / 4;



            // Assign colors based on resource type
            let fill = 'grey'; // Default
            if (resource === 'desert') fill = 'tan';
            else if (resource === 'wood') fill = 'green';
            else if (resource === 'brick') fill = 'red';
            else if (resource === 'wool') fill = 'lightgreen';
            else if (resource === 'wheat') fill = 'yellow';
            else if (resource === 'ore') fill = 'darkgrey';

            const newHex = { x, y, radius, fill, text: tile.number?.toString() }

            newBoard.push(newHex);
        }

        setHexagons(newBoard);
    }, [G.tiles])

    return (
        <div className="gameContainer">
            <Stage width={1000} height={700} className="gameBoard">
                <Layer>
                    {hexagons && hexagons.map((hex, index) => <Hexagon key={index} {...hex} />)}
                </Layer>
            </Stage>
        </div>
    );
};