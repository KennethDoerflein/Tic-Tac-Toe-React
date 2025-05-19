import React, { useEffect, MouseEvent } from "react";
import { Row, Col, Container } from "react-bootstrap";

type Player = "X" | "O" | null;
type BoardType = Player[][];
type Difficulty = "easy" | "medium" | "hard";
type ScoresType = {
  easy: [number, number, number];
  medium: [number, number, number];
  hard: [number, number, number];
};

interface BoardProps {
  board: BoardType;
  moveHuman: (e: MouseEvent<HTMLDivElement>) => void;
  utility: number;
  empty: Player;
  human: Player;
  computer: Player;
  entitiesTurn: Player;
  updateBoard: (rawCord: number, entity: Player) => void;
  setEntitiesTurn: (entity: Player) => void;
  scores: ScoresType;
  setScores: (scores: ScoresType) => void;
  difficulty: Difficulty;
}

const Board: React.FC<BoardProps> = ({
  board,
  moveHuman,
  utility,
  empty,
  human,
  computer,
  entitiesTurn,
  updateBoard,
  setEntitiesTurn,
  scores,
  setScores,
  difficulty,
}) => {
  function checkBoardFull(): boolean {
    for (let row = 0; row < board.length; row++) {
      if (board[row].includes(empty)) {
        return false;
      }
    }
    return true;
  }

  function checkBoardStatus(): number {
    // Check rows
    for (let row = 0; row < board.length; row++) {
      if (
        board[row][0] !== empty &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return board[row][0] === computer ? utility : -utility;
      }
    }

    // Check columns
    for (let col = 0; col < board[0].length; col++) {
      if (
        board[0][col] !== empty &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return board[0][col] === computer ? utility : -utility;
      }
    }

    // Diagonals
    if (board[0][0] !== empty && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0] === computer ? utility : -utility;
    }

    if (board[0][2] !== empty && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2] === computer ? utility : -utility;
    }

    return 0;
  }

  function minimax(depth: number, isMax: boolean): number {
    const boardStatus = checkBoardStatus();
    if (boardStatus === utility || boardStatus === -utility) {
      return boardStatus - depth * (boardStatus / utility);
    } else if (checkBoardFull()) {
      return 0;
    }

    let best: number;

    if (isMax) {
      best = Number.MIN_SAFE_INTEGER;
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === empty) {
            board[row][col] = computer;
            best = Math.max(best, minimax(depth + 1, false));
            board[row][col] = empty;
          }
        }
      }
    } else {
      best = Number.MAX_SAFE_INTEGER;
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === empty) {
            board[row][col] = human;
            best = Math.min(best, minimax(depth + 1, true));
            board[row][col] = empty;
          }
        }
      }
    }

    return best;
  }

  function findBestMove(): [number, number] {
    let bestVal = Number.MIN_SAFE_INTEGER;
    let bestMove: [number, number] = [-1, -1];

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === empty) {
          board[row][col] = computer;
          const moveVal = minimax(0, false);
          board[row][col] = empty;

          if (moveVal > bestVal) {
            bestVal = moveVal;
            bestMove = [row, col];
          }
        }
      }
    }

    return bestMove;
  }

  function getRandomMove(): [number, number] {
    const availableMoves: [number, number][] = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === empty) {
          availableMoves.push([row, col]);
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  function makeComputerMove(): void {
    if (entitiesTurn !== computer) return;

    let move: [number, number];
    if (difficulty === "easy") {
      move = Math.random() < 0.8 ? getRandomMove() : findBestMove();
    } else if (difficulty === "medium") {
      move = Math.random() < 0.5 ? getRandomMove() : findBestMove();
    } else {
      move = findBestMove();
    }

    const rawCord = move[0] * board.length + move[1];
    updateBoard(rawCord, computer);
  }

  useEffect(() => {
    const status = checkBoardStatus();
    if (entitiesTurn === computer && !checkBoardFull() && status === 0) {
      setTimeout(() => makeComputerMove(), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitiesTurn, board]);

  useEffect(() => {
    const gameStatus = checkBoardStatus();
    const boardFull = checkBoardFull();

    if (boardFull || gameStatus !== 0) {
      setEntitiesTurn(empty);
      setTimeout(() => {
        const newScores = { ...scores };
        if (boardFull && gameStatus === 0) {
          newScores[difficulty][2]++; // Tie
        } else if (gameStatus > 0) {
          newScores[difficulty][0]++; // Computer wins
        } else if (gameStatus < 0) {
          newScores[difficulty][1]++; // Human wins
        }
        setScores(newScores);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return (
    <Container id="board">
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => {
            const index = rowIndex * board.length + colIndex;
            return (
              <Col
                key={index}
                id={index.toString()}
                onClick={moveHuman}
                className={cell || entitiesTurn === empty ? "boxUsed" : ""}>
                {cell}
              </Col>
            );
          })}
        </Row>
      ))}
    </Container>
  );
};

export default Board;
