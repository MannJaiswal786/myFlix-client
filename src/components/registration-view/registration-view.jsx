// Import react and bootstrap to use inside the registration view
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
// Import Axios to send and receive response from the backend server we coded previously
// Import link to use the route created inside main view
import { Link } from "react-router-dom";
import axios from "axios";

// Set the username, password, email, birthdate
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // Data validation to registration form validation
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

  // Set data validation rules to use inside the registration form
  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdateError = {};
    let isValid = true;

    // If the length of the username is less than 4 characters, display an error
    if (username.trim().length < 4) {
      usernameError.usernameShort =
        "Username incorrect. Use at least 4 characters.";
      isValid = false;
    }
    // If the password length is less than 5 characters, display an error
    if (password.trim().length < 5) {
      passwordError.passwordMissing =
        "Password incorrect. Use at least 5 characters.";
      isValid = false;
    }
    // Email should include @ symbol to get approved as a correct email address or else display an error
    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotEmail = "Email address incorrect.";
      isValid = false;
    }
    // birthdate shouldn't be empty and should be valid
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
    // Render the registration view to display the registration form with data validation
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
                  <br />
                  <Button type="submit" variant="info" onClick={handleSubmit}>
                    Register
                  </Button>
                  &nbsp; &nbsp;
                  <Link to="/">
                    <Button variant="info" type="button">
                      Already a user? Log in here
                    </Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

// Registration view proptypes
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    BirthDate: PropTypes.string.isRequired,
  }),
};
