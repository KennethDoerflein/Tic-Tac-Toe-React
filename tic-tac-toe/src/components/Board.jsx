import React from "react";
import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

export default function Board({ board, moveHuman, utility, empty, human, computer, entitiesTurn, updateBoard, setEntitiesTurn, scores, setScores }) {
  function checkBoardFull() {
    for (let row = 0; row < board.length; row++) {
      if (board[row].indexOf(empty) !== -1) {
        return false;
      }
    }
    return true;
  }

  function checkBoardStatus() {
    // Check rows for win
    for (let row = 0; row < board.length; row++) {
      if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        if (board[row][0] === computer) {
          return utility;
        } else if (board[row][0] === human) {
          return -utility;
        }
      }
    }

    // Check columns for win
    for (let col = 0; col < board[0].length; col++) {
      if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        if (board[0][col] === computer) {
          return utility;
        } else if (board[0][col] === human) {
          return -utility;
        }
      }
    }

    // Check right diagonal for win
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === computer) {
        return utility;
      } else if (board[0][0] === human) {
        return -utility;
      }
    }

    // Check left diagonal for win
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === computer) {
        return utility;
      } else if (board[0][2] === human) {
        return -utility;
      }
    }
    return 0;
  }

  function minimax(depth, isMax) {
    let boardStatus = checkBoardStatus();
    if (boardStatus === utility || boardStatus === -utility) {
      return boardStatus - depth * (boardStatus / utility);
    } else if (checkBoardFull()) {
      return 0;
    }

    let best;
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

  function findBestMove() {
    let bestVal = Number.MIN_SAFE_INTEGER;
    let bestMove = [-1, -1];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === empty) {
          board[row][col] = computer;
          let minimaxVal = empty;
          minimaxVal = minimax(0, false);

          board[row][col] = empty;
          if (minimaxVal > bestVal) {
            bestMove[0] = row;
            bestMove[1] = col;
            bestVal = minimaxVal;
          }
        }
      }
    }
    return bestMove;
  }

  useEffect(() => {
    if (entitiesTurn === computer && !checkBoardFull()) {
      setTimeout(() => {
        const computerRawCord = findBestMove();
        const rawCord = computerRawCord[0] * board.length + computerRawCord[1];
        updateBoard(rawCord, computer);
      }, 500);
    }
    // eslint-disable-next-line
  }, [entitiesTurn, board]);

  useEffect(() => {
    const gameStatus = checkBoardStatus();
    const boardFull = checkBoardFull();
    const delay = boardFull ? 400 : 200;
    if (boardFull || gameStatus !== 0) {
      setEntitiesTurn(empty);
      setTimeout(() => {
        const newScores = [...scores];
        if (boardFull) {
          newScores[2]++;
        } else {
          if (gameStatus > 0) {
            newScores[0]++;
          } else if (gameStatus < 0) {
            newScores[1]++;
          }
        }
        setScores(newScores);
      }, delay);
    }
    // eslint-disable-next-line
  }, [board]);

  return (
    <Container id="board">
      <Row>
        <Col key="0" id="0" onClick={moveHuman} className={board[0][0] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[0][0]}
        </Col>
        <Col key="1" id="1" onClick={moveHuman} className={board[0][1] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[0][1]}
        </Col>
        <Col key="2" id="2" onClick={moveHuman} className={board[0][2] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[0][2]}
        </Col>
      </Row>
      <Row>
        <Col key="3" id="3" onClick={moveHuman} className={board[1][0] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[1][0]}
        </Col>
        <Col key="4" id="4" onClick={moveHuman} className={board[1][1] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[1][1]}
        </Col>
        <Col key="5" id="5" onClick={moveHuman} className={board[1][2] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[1][2]}
        </Col>
      </Row>
      <Row>
        <Col key="6" id="6" onClick={moveHuman} className={board[2][0] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[2][0]}
        </Col>
        <Col key="7" id="7" onClick={moveHuman} className={board[2][1] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[2][1]}
        </Col>
        <Col key="8" id="8" onClick={moveHuman} className={board[2][2] || entitiesTurn === empty ? "boxUsed" : ""}>
          {board[2][2]}
        </Col>
      </Row>
    </Container>
  );
}
