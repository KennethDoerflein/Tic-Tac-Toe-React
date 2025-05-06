import React from "react";
import { useState } from "react";
import Board from "./components/Board";
import Scores from "./components/Scores";

import "./styles.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  document.documentElement.setAttribute("data-bs-theme", "dark");

  const utility = 25;
  const empty = null;
  const computer = "X";
  const human = "O";
  const [board, setBoard] = useState([
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty],
  ]);
  const [scores, setScores] = useState({
    easy: [0, 0, 0],    // computer, human, ties
    medium: [0, 0, 0],  // computer, human, ties
    hard: [0, 0, 0]     // computer, human, ties
  });
  const [entitiesTurn, setEntitiesTurn] = useState(human);
  const [difficulty, setDifficulty] = useState("hard");

  function newGame() {
    setBoard([
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty],
    ]);
    setEntitiesTurn(human);
  }

  function updateBoard(rawCord, entity) {
    const newBoard = [...board];
    let row = parseInt(rawCord / newBoard.length);
    let col = rawCord - row * newBoard[row].length;
    if (newBoard[row][col] === empty) {
      newBoard[row][col] = entity;
      setBoard(newBoard);
      if (entity === human) {
        setEntitiesTurn(computer);
      } else if (entity === computer) {
        setEntitiesTurn(human);
      }
    }
  }

  function moveHuman(e) {
    if (entitiesTurn === human) {
      let rawCord = parseInt(e.target.id);
      updateBoard(rawCord, human);
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
}
