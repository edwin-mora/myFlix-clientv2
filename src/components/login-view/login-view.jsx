import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// styling
import { Button, Form, Row } from "react-bootstrap";
import "./login-view.scss";

// export LoginView function component
export function LoginView(props) {
  // hook updates function state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // login function
  const handleSubmit = (e) => {
    e.preventDefault();
    // sends request for authentication
    axios
      .post("https://movieflixappbyedwin.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
        alert("Register an account.");
      });
  };

  return (
    <Row className="login-form">
      <Form>
        <p>Please login to continue.</p>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button id="button-main" type="submit" onClick={handleSubmit}>
          Login
        </Button>

        <p className="register-text">
          Don't have an account?
          <Link to={"/register"}>
            <Button variant="link">Register here</Button>
          </Link>
        </p>
      </Form>
    </Row>
  );
}

// static propTypes properties for LoginView
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
