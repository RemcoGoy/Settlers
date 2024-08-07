'use client'

import { Client } from 'boardgame.io/react';
import { SettlersGame } from './game';
import { SettlersBoard } from '@/components/Board';

const NUMBER_OF_PLAYERS = 4;

const App = Client({ game: SettlersGame, board: SettlersBoard, numPlayers: NUMBER_OF_PLAYERS });

export default App;