import React, { ChangeEvent } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

type Difficulty = "easy" | "medium" | "hard";
type Player = "X" | "O" | null;
type ScoresType = {
  easy: [number, number, number];
  medium: [number, number, number];
  hard: [number, number, number];
};

interface ScoresProps {
  scores: ScoresType;
  entitiesTurn: Player;
  newGame: () => void;
  difficulty: Difficulty;
  setDifficulty: (level: Difficulty) => void;
}

const Scores: React.FC<ScoresProps> = ({
  scores,
  entitiesTurn,
  newGame,
  difficulty,
  setDifficulty,
}) => {
  const currentScores = scores[difficulty];

  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as Difficulty);
  };

  return (
    <>
      <Container id="scores">
        <Row className="mb-3">
          <Col>Human: {currentScores[1]}</Col>
          <Col>Ties: {currentScores[2]}</Col>
          <Col>Computer: {currentScores[0]}</Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Form.Select
              value={difficulty}
              onChange={handleDifficultyChange}
              className="form-select-sm"
              disabled={entitiesTurn !== null}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <Button className="mt-3 btn-danger" hidden={entitiesTurn !== null} onClick={newGame}>
        New Game
      </Button>
    </>
  );
};

export default Scores;
