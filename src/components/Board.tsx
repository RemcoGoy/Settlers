import { GameState } from "@/lib/types/game";
import React, { useEffect, useState } from "react";
import FontFaceObserver from 'fontfaceobserver';
import { Stage, Layer, RegularPolygon, Text, Star, Circle } from 'react-konva';
import { boardLayout } from "@/lib/helpers/generate";



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
    fill: string | null;
    handleClick: (e: any) => void;
}

interface RoadProps {
    x: number;
    y: number;
    fill: string | null;
    handleClick: (e: any) => void;
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
            <Text x={x - coords.length * 5} y={y - 45} text={coords} fontFamily="'Ubuntu Mono'" fontSize={18} />
            {text && <Text x={x - 11 * text.length} y={y - 20} text={text} fontFamily="'Ubuntu Mono'" fontSize={42} align="center" verticalAlign="middle" />}
            {robber && <Star fill={'black'} x={x - 35} y={y} innerRadius={8} outerRadius={12} numPoints={5} />}
        </>
    )
}

function SettleSpot({ x, y, fill, handleClick }: SettleSpotProps) {
    return (<Circle onClick={handleClick} x={x} y={y} radius={15} fill={fill ?? "gray"} />)
}

function Road({ x, y, fill, handleClick }: RoadProps) {
    return (<RegularPolygon onClick={handleClick} x={x} y={y} radius={15} sides={4} fill={fill ?? "gray"} />)
}

export function SettlersBoard({ ctx, G, moves }: { ctx: any, G: GameState, moves: any }) {
    const [hexagons, setHexagons] = useState<any[]>([]);
    const [settleLocations, setSettleLocations] = useState<any[]>([]);
    const [roads, setRoads] = useState<any[]>([]);

    const [fontLoaded, setFontLoaded] = useState(false);

    const RADIUS = 75;
    const HEX_WIDTH = Math.sqrt(3) * RADIUS;
    const HEX_HEIGHT = 2 * RADIUS;

    function getHexX(q: number) {
        return window.innerWidth / 2 + q * HEX_WIDTH;
    }

    function getHexY(r: number) {
        return window.innerHeight / 2 + r * HEX_HEIGHT * 3 / 4;
    }

    function getSettleXY(coords: number[][]) {
        let x = 0;
        let y = 0;

        if (coords[0][1] === coords[1][1]) {
            x = getHexX((coords[1][0] + coords[0][0]) / 2);
            y = getHexY(coords[2][1]) - RADIUS;
        } else {
            x = getHexX(coords[0][0]);
            y = getHexY(coords[1][1]) - RADIUS / 2;
        }

        return { x: x, y: y }
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

            const x = getHexX(coords.q);
            const y = getHexY(coords.r);

            // Assign colors based on resource type
            let fill = 'grey'; // Default
            if (resource === 'desert') fill = 'tan';
            else if (resource === 'wood') fill = '#be7c4d';
            else if (resource === 'brick') fill = '#bc4b51';
            else if (resource === 'wool') fill = '#8cb369';
            else if (resource === 'wheat') fill = '#f4e285';
            else if (resource === 'ore') fill = '#8da1b9';
            else if (resource === 'sea') fill = '#c9ebed';

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

            const handleClick = (e: any) => {
                if (ctx.phase === "initialSettle") {
                    moves.PlaceInitialSettlement(settleSpot.coords)
                } else {
                    moves.PlaceSettlement(settleSpot.coords);
                }
            }

            const newSettle: SettleSpotProps = { x: -1, y: -1, fill: null, handleClick }

            const { x, y } = getSettleXY(coords);

            newSettle['x'] = x;
            newSettle['y'] = y;

            if (settleSpot.playerId) {
                newSettle['fill'] = G.players.find(p => p.id === settleSpot.playerId)?.color ?? null;
            }

            settles.push(newSettle);
        }

        setSettleLocations(settles)
    }, [G.settleSpots]);

    useEffect(() => {
        const roads: any[] = [];

        for (let i = 0; i < G.roads.length; i++) {
            const road = G.roads[i];

            const xy1 = getSettleXY(road.coords[0]);
            const xy2 = getSettleXY(road.coords[1]);

            const x = (xy1.x + xy2.x) / 2;
            const y = (xy1.y + xy2.y) / 2;

            const handleClick = (e: any) => {
                moves.PlaceRoad(road.coords);
            }

            const roadData: { x: number, y: number, fill: string | null, handleClick: (e: any) => void } = { x, y, fill: null, handleClick };

            if (road.playerId) {
                roadData['fill'] = G.players.find(p => p.id === road.playerId)?.color ?? null;
            }

            roads.push(roadData);
        }

        setRoads(roads);
    }, [G.roads]);

    return (
        <div className="gameContainer">
            {fontLoaded &&
                <Stage width={window.innerWidth} height={window.innerHeight} className="gameBoard">
                    <Layer>
                        {hexagons && hexagons.map((hex, index) => <Hexagon key={index} {...hex} />)}
                        {settleLocations && settleLocations.map((location, index) => <SettleSpot key={index} {...location} />)}
                        {roads && roads.map((road, index) => <Road key={index} {...road} />)}
                    </Layer>
                </Stage>
            }
        </div>
    );
};