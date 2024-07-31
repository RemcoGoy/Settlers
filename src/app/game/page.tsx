'use client'

import { Client } from 'boardgame.io/react';
import { SettlersGame } from './game';
import { SettlersBoard } from '@/components/Board';

const App = Client({ game: SettlersGame, board: SettlersBoard });

export default App;