import { Row, Col, Container, Button } from "react-bootstrap";

export default function Scores({ scores, entitiesTurn, newGame }) {
  return (
    <>
      <Container id="scores">
        <Row>
          <Col>Human: {scores[1]}</Col>
          <Col>Ties: {scores[2]}</Col>
          <Col>Computer: {scores[0]}</Col>
        </Row>
      </Container>
      <Button className="mt-3 btn-danger" hidden={entitiesTurn !== null} onClick={newGame}>
        New Game
      </Button>
    </>
  );
}
