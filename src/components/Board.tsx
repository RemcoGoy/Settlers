import { GameState } from "@/types/game";
import React, { useEffect, useState } from "react";
import FontFaceObserver from 'fontfaceobserver';
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
            strokeWidth={1}
        />
        {text && <Text x={x - 13 * text.length} y={y - 26} text={text} fontFamily="'Ubuntu Mono'" fontSize={54} align="center" verticalAlign="middle" />}
    </>
);

export function SettlersBoard({ ctx, G, moves }: { ctx: any, G: GameState, moves: any }) {
    const [hexagons, setHexagons] = useState<any[]>([]);
    const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 1200 });
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        const font = new FontFaceObserver('Ubuntu Mono');
        font.load().then(() => setFontLoaded(true));
    }, []);

    useEffect(() => {
        const newBoard: HexagonProps[] = [];

        const radius = 100;
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

            const x = canvasSize.width / 2 + coords.q * hexWidth + (coords.r % 2) * hexWidth / 2;
            const y = canvasSize.height / 2 + coords.r * hexHeight * 3 / 4;



            // Assign colors based on resource type
            let fill = 'grey'; // Default
            if (resource === 'desert') fill = 'tan';
            else if (resource === 'wood') fill = '#be7c4d';
            else if (resource === 'brick') fill = '#bc4b51';
            else if (resource === 'wool') fill = '#8cb369';
            else if (resource === 'wheat') fill = '#f4e285';
            else if (resource === 'ore') fill = '#8da1b9';

            const newHex = { x, y, radius, fill, text: tile.number?.toString() }

            newBoard.push(newHex);
        }

        setHexagons(newBoard);
    }, [G.tiles])

    return (
        <div className="gameContainer">
            {fontLoaded &&
                <Stage width={canvasSize.width} height={canvasSize.height} className="gameBoard">
                    <Layer>
                        {hexagons && hexagons.map((hex, index) => <Hexagon key={index} {...hex} />)}
                    </Layer>
                </Stage>
            }
        </div>
    );
};