export function N_Settle(hex: { q: number, r: number }) {
    return [[hex.q - 0.5, hex.r - 1], [hex.q + 0.5, hex.r - 1], [hex.q, hex.r]]
}

export function S_Settle(hex: { q: number, r: number }) {
    return [[hex.q, hex.r], [hex.q - 0.5, hex.r + 1], [hex.q + 0.5, hex.r + 1]];
}

export function NW_Settle(hex: { q: number, r: number }) {
    return [[hex.q - 0.5, hex.r - 1], [hex.q - 1, hex.r], [hex.q, hex.r]];
}

export function SW_Settle(hex: { q: number, r: number }) {
    return [[hex.q - 1, hex.r], [hex.q, hex.r], [hex.q - 0.5, hex.r + 1]];
}

export function NE_Settle(hex: { q: number, r: number }) {
    return [[hex.q + 0.5, hex.r - 1], [hex.q, hex.r], [hex.q + 1, hex.r]];
}

export function SE_Settle(hex: { q: number, r: number }) {
    return [[hex.q, hex.r], [hex.q + 1, hex.r], [hex.q + 0.5, hex.r + 1]];
}

export function isTopSettle(coords: number[][]) {
    return coords[0][1] === coords[1][1];
}