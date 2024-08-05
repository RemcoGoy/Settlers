import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GameState, SettleSpot } from "./types/game";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTopSettle(coords: number[][]) {
  return coords[0][1] === coords[1][1];
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