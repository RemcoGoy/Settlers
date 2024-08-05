import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GameState, RoadData, SettleSpot } from "./types/game";
import { isTopSettle } from "./helpers/settle";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasAdjecentRoads(G: GameState, settleSpot: SettleSpot, currentPlayer: string) {
  let hasAdjecentRoads = false;

  const adjecentRoads = G.roads.filter(r => JSON.stringify(settleSpot.coords) === JSON.stringify(r.coords[0]) || JSON.stringify(settleSpot.coords) === JSON.stringify(r.coords[1]));
  if (adjecentRoads.some(r => r.playerId === currentPlayer)) {
    hasAdjecentRoads = true;
  }

  return hasAdjecentRoads;
}

export function hasAdjecentSettles(G: GameState, settleSpot: SettleSpot) {
  let hasAdjecentSettles = false;

  const adjecentSettles = [];

  if (isTopSettle(settleSpot.coords)) {
    const topCoords = [[settleSpot.coords[2][0], settleSpot.coords[2][1] - 2], settleSpot.coords[0], settleSpot.coords[1]];
    const topAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(topCoords));
    if (topAdjecent) {
      adjecentSettles.push(topAdjecent);
    }

    const leftCoords = [settleSpot.coords[0], [settleSpot.coords[1][0] - 1.5, settleSpot.coords[1][1] + 1], settleSpot.coords[2]];
    const leftAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(leftCoords));;
    if (leftAdjecent) {
      adjecentSettles.push(leftAdjecent);
    }

    const rightCoords = [settleSpot.coords[1], settleSpot.coords[2], [settleSpot.coords[0][0] + 1.5, settleSpot.coords[0][1] + 1]]
    const rightAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(rightCoords));;
    if (rightAdjecent) {
      adjecentSettles.push(rightAdjecent);
    }
  } else {
    const leftCoords = [[settleSpot.coords[2][0] - 1.5, settleSpot.coords[2][1] - 1], settleSpot.coords[0], settleSpot.coords[1]];
    const leftAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(leftCoords));;
    if (leftAdjecent) {
      adjecentSettles.push(leftAdjecent);
    }

    const rightCoords = [settleSpot.coords[0], [settleSpot.coords[1][0] + 1.5, settleSpot.coords[1][1] - 1], settleSpot.coords[2]];
    const rightAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(rightCoords));;
    if (rightAdjecent) {
      adjecentSettles.push(rightAdjecent);
    }

    const bottomCoords = [settleSpot.coords[1], settleSpot.coords[2], [settleSpot.coords[0][0], settleSpot.coords[0][1] + 2]];
    const bottomAdjecent: SettleSpot | undefined = G.settleSpots.find(spot => JSON.stringify(spot.coords) === JSON.stringify(bottomCoords));;
    if (bottomAdjecent) {
      adjecentSettles.push(bottomAdjecent);
    }
  }

  if (adjecentSettles.some(s => s.playerId !== null)) {
    hasAdjecentSettles = true;
  }

  return hasAdjecentSettles;
}

export function rHasAdjecentRoad(G: GameState, road: RoadData, currentPlayer: string) {
  let adjecentRoad = false;

  for (const coord of road.coords) {
    const r = G.roads.filter(rx =>
      (JSON.stringify(rx.coords[0]) === JSON.stringify(coord)
        || JSON.stringify(rx.coords[1]) === JSON.stringify(coord))
      && JSON.stringify(rx.coords) !== JSON.stringify(road.coords)
    );


    if (!adjecentRoad && r.some(r => r.playerId === currentPlayer)) {
      adjecentRoad = true;
    }
  }

  return adjecentRoad;
}

export function rHasAdjecentSettle(G: GameState, road: RoadData, currentPlayer: string) {
  let adjecentSettle = false;

  const adjecentSettles = [];
  for (const coord of road.coords) {
    const settle = G.settleSpots.find(s => JSON.stringify(coord) === JSON.stringify(s.coords));
    if (settle) {
      adjecentSettles.push(settle);
    }
  }

  if (adjecentSettles.some(s => s.playerId === currentPlayer)) {
    adjecentSettle = true;
  }

  return adjecentSettle;
}

export function placeSettlement(G: GameState, settleSpot: SettleSpot, currentPlayer: string) {
  settleSpot.playerId = currentPlayer;
  const player = G.players.find(p => p.id === currentPlayer);
  if (player) {
    player.points++;
  }
}