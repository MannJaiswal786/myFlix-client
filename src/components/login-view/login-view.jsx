// Import all the react components, axios, Link and bootstrap to implement inside out project
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

// Set the username and Password props and then send request for validating to the server
// Axios sends a request to the backend for verification, if there is a user with that same username and password,
// then the axios will come back with a response to log in and give access to the user,
// if not then it comes up with an error saying no such user
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://downtown-cinema.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    // Display the react components added to render a login form
    // Implement a react container, row, columns and finally a card to display the input text
    <Container>
      <Row>
        <Col>
          <CardGroup className="loginform">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Please Login Here!</Card.Title>

                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label className="margin">Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                  <span>
                    <Button variant="info" type="submit" onClick={handleSubmit}>
                      Login
                    </Button>
                    &nbsp; &nbsp;
                    <Link to={`/register`}>
                      <Button variant="info link">
                        Not a user? Register here
                      </Button>
                    </Link>
                  </span>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

// Proptypes for login state
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
