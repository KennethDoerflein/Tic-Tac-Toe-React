import { Row, Col, Container, Button, Form } from "react-bootstrap";

export default function Scores({ scores, entitiesTurn, newGame, difficulty, setDifficulty }) {
  const currentScores = scores[difficulty];

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
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-select-sm"
              disabled={entitiesTurn !== null}
            >
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
}
