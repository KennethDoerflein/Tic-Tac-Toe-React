// src/app/page.tsx
"use client";

import { useState, MouseEvent } from "react";
import type { NextPage } from "next";
import Board from "./components/Board";
import Scores from "./components/Scores";

import { Container } from "react-bootstrap";

type Player = "X" | "O" | null;
type BoardType = Player[][];
type Difficulty = "easy" | "medium" | "hard";
type ScoresType = {
  easy: [number, number, number];
  medium: [number, number, number];
  hard: [number, number, number];
};

const HomePage: NextPage = () => {
  const utility = 25;
  const empty: Player = null;
  const computer: Player = "X";
  const human: Player = "O";

  const [board, setBoard] = useState<BoardType>([
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty],
  ]);

  const [scores, setScores] = useState<ScoresType>({
    easy: [0, 0, 0],
    medium: [0, 0, 0],
    hard: [0, 0, 0],
  });

  const [entitiesTurn, setEntitiesTurn] = useState<Player>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");

  function newGame() {
    setBoard([
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty],
    ]);
    setEntitiesTurn(human);
  }

  function updateBoard(rawCord: number, entity: Player) {
    const newBoard = [...board.map((row) => [...row])]; // deep clone
    const row = Math.floor(rawCord / newBoard.length);
    const col = rawCord % newBoard[row].length;

    if (newBoard[row][col] === empty) {
      newBoard[row][col] = entity;
      setBoard(newBoard);
      setEntitiesTurn(entity === human ? computer : human);
    }
  }

  function moveHuman(e: MouseEvent<HTMLDivElement>) {
    if (entitiesTurn === human) {
      const rawCord = parseInt((e.target as HTMLElement).id);
      if (!isNaN(rawCord)) {
        updateBoard(rawCord, human);
      }
    }
  }

  return (
    <Container className="text-center mt-5">
      <Board
        board={board}
        moveHuman={moveHuman}
        utility={utility}
        empty={empty}
        human={human}
        computer={computer}
        entitiesTurn={entitiesTurn}
        updateBoard={updateBoard}
        setEntitiesTurn={setEntitiesTurn}
        scores={scores}
        setScores={setScores}
        difficulty={difficulty}
      />
      <Scores
        scores={scores}
        entitiesTurn={entitiesTurn}
        newGame={newGame}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
    </Container>
  );
};

export default HomePage;
