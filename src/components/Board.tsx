import { GameState } from "@/types/game";
import React, { useEffect, useState } from "react";
import FontFaceObserver from 'fontfaceobserver';
import { Stage, Layer, RegularPolygon, Text, Star, Circle } from 'react-konva';
import { boardLayout } from "@/app/game/game";



interface HexagonProps {
    x: number;
    y: number;
    q: number;
    r: number;
    radius: number;
    fill?: string;
    text?: string;
    robber?: boolean;
}

interface SettleSpotProps {
    x: number;
    y: number;
}

function Hexagon({ x, y, q, r, radius, fill, text, robber }: HexagonProps) {
    const coords = q + "," + r;

    return (
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
            <Text x={x - coords.length * 4} y={y - 50} text={coords} fontFamily="'Ubuntu Mono'" fontSize={18} />
            {text && <Text x={x - 13 * text.length} y={y - 26} text={text} fontFamily="'Ubuntu Mono'" fontSize={54} align="center" verticalAlign="middle" />}
            {robber && <Star fill={'black'} x={x - 50} y={y} innerRadius={10} outerRadius={15} numPoints={5} />}
        </>
    )
}

function SettleSpot({ x, y }: SettleSpotProps) {
    return (
        <Circle x={x} y={y} radius={10} fill="gray" />
    )
}

export function SettlersBoard({ ctx, G, moves }: { ctx: any, G: GameState, moves: any }) {
    const [hexagons, setHexagons] = useState<any[]>([]);
    const [settleLocations, setSettleLocations] = useState<any[]>([])

    const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 1200 });
    const [fontLoaded, setFontLoaded] = useState(false);

    const RADIUS = 100;
    const HEX_WIDTH = Math.sqrt(3) * RADIUS;
    const HEX_HEIGHT = 2 * RADIUS;

    function getHexX(q: number, r: number) {
        return canvasSize.width / 2 + q * HEX_WIDTH + (r % 2) * HEX_WIDTH / 2;
    }

    function getHexY(r: number) {
        return canvasSize.height / 2 + r * HEX_HEIGHT * 3 / 4;
    }

    useEffect(() => {
        const font = new FontFaceObserver('Ubuntu Mono');
        font.load().then(() => setFontLoaded(true));
    }, []);

    useEffect(() => {
        const newBoard: HexagonProps[] = [];



        for (let i = 0; i < G.tiles.length; i++) {
            const coords = boardLayout[i];
            const tile = G.tiles[i];
            const resource = tile.type;

            const x = getHexX(coords.q, coords.r);
            const y = getHexY(coords.r);

            // Assign colors based on resource type
            let fill = 'grey'; // Default
            if (resource === 'desert') fill = 'tan';
            else if (resource === 'wood') fill = '#be7c4d';
            else if (resource === 'brick') fill = '#bc4b51';
            else if (resource === 'wool') fill = '#8cb369';
            else if (resource === 'wheat') fill = '#f4e285';
            else if (resource === 'ore') fill = '#8da1b9';

            const newHex = { x, y, q: coords.q, r: coords.r, radius: RADIUS, fill, text: tile.number?.toString(), robber: tile.hasRobber }

            newBoard.push(newHex);
        }

        setHexagons(newBoard);
    }, [G.tiles])

    useEffect(() => {
        const settles: any[] = [];

        for (let i = 0; i < G.settleSpots.length; i++) {
            const settleSpot = G.settleSpots[i];
            const coords = settleSpot.coords;

            const newSettle = { x: -1, y: -1 }

            if (coords[0][1] === coords[1][1]) {
                const x = getHexX((coords[1][0] + coords[0][0]) / 2, coords[0][1]);
                const y = getHexY(coords[2][1]);

                newSettle['x'] = x;
                newSettle['y'] = y - RADIUS;
            } else {
                const x = getHexX(coords[0][0], coords[0][1]);
                const y = getHexY(coords[1][1]);

                newSettle['x'] = x;
                newSettle['y'] = y - RADIUS / 2;
            }

            settles.push(newSettle);
        }

        setSettleLocations(settles)
    }, [G.settleSpots]);

    return (
        <div className="gameContainer">
            {fontLoaded &&
                <Stage width={canvasSize.width} height={canvasSize.height} className="gameBoard">
                    <Layer>
                        {hexagons && hexagons.map((hex, index) => <Hexagon key={index} {...hex} />)}
                        {settleLocations && settleLocations.map((location, index) => <SettleSpot key={index} {...location} />)}
                    </Layer>
                </Stage>
            }
        </div>
    );
};