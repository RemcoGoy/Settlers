import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Stage, Layer, RegularPolygon, Text } from 'react-konva';
import { GameState } from "@/types/game";
import Konva from "konva";

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

export const SettlersBoard: React.FC = () => {
    const [hexagons] = useState(() => {
        const radius = 50;
        const hexWidth = Math.sqrt(3) * radius; // Width of a hexagon
        const hexHeight = 2 * radius;         // Height of a hexagon

        const boardLayout = [
            { q: 0, r: -2 }, { q: 1, r: -2 }, { q: -1, r: -2 },
            { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 }, { q: 2, r: -1 },
            { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 },
            { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 }, { q: 1, r: 1 },
            { q: -1, r: 2 }, { q: 0, r: 2 }, { q: 1, r: 2 }
        ];

        const resources = ['Desert', 'Wood', 'Wood', 'Wood', 'Wood', 'Brick', 'Brick', 'Brick', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Wheat', 'Wheat', 'Wheat', 'Wheat', 'Ore', 'Ore', 'Ore']; // Catan resource distribution

        const shuffledResources = resources.sort(() => Math.random() - 0.5); // Shuffle resources

        return boardLayout.map((coords, index) => {
            const x = 300 + coords.q * hexWidth + (coords.r % 2) * hexWidth / 2; // Offset for even rows
            const y = 200 + coords.r * hexHeight * 3 / 4; // 3/4 to overlap
            const resource = shuffledResources[index];

            // Assign colors based on resource type
            let fill = 'grey'; // Default
            if (resource === 'Desert') fill = 'tan';
            else if (resource === 'Wood') fill = 'green';
            else if (resource === 'Brick') fill = 'red';
            else if (resource === 'Sheep') fill = 'lightgreen';
            else if (resource === 'Wheat') fill = 'yellow';
            else if (resource === 'Ore') fill = 'darkgrey';

            return { x, y, radius, fill, text: resource };
        });
    });

    return (
        <div className="gameContainer">
            <Stage width={1000} height={700} className="gameBoard">
                <Layer>
                    {hexagons.map((hex, index) => <Hexagon key={index} {...hex} />)}
                </Layer>
            </Stage>
        </div>
    );
};