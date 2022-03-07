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
import { Link } from "react-router-dom";
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [birthdateError, setBirthdateError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios
        .post("https://downtown-cinema.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthdate: birthdate,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("error registering the user");
        });
    }
  };

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdateError = {};
    let isValid = true;

    if (username.trim().length < 4) {
      usernameError.usernameShort =
        "Username incorrect. Use at least 4 characters.";
      isValid = false;
    }
    if (password.trim().length < 5) {
      passwordError.passwordMissing =
        "Password incorrect. Use at least 5 characters.";
      isValid = false;
    }
    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotEmail = "Email address incorrect.";
      isValid = false;
    }
    if (birthdate === "") {
      birthdateError.birthdateEmpty = "Please enter your birthdate.";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdateError(birthdateError);
    return isValid;
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup className="registration">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Please Register here!</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label className="margin">Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter your username"
                    />
                    {Object.keys(usernameError).map((key) => {
                      return <div key={key}>{usernameError[key]}</div>;
                    })}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="margin">Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Password must be 8 or more characters"
                    />
                    {Object.keys(passwordError).map((key) => {
                      return <div key={key}>{passwordError[key]}</div>;
                    })}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="margin">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                    {Object.keys(emailError).map((key) => {
                      return <div key={key}>{emailError[key]}</div>;
                    })}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="margin">Birthdate:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                    />
                    {Object.keys(birthdateError).map((key) => {
                      return <div key={key}>{birthdateError[key]}</div>;
                    })}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="success"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    BirthDate: PropTypes.string.isRequired,
  }),
};
