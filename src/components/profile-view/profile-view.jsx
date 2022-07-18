import React from "react";

import "./profile-view.scss";
import axios from "axios";

import PropTypes from "prop-types";

import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      birthday: null,
      favoriteMovies: [],
    };

    this.setUsername = this.setUsername.bind(this);
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://movieflixappbyedwin.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  editProfile = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let newUser = this.state.username;
    console.log(newUser);
    axios
      .put(
        `https://movieflixappbyedwin.herokuapp.com/users/${user}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        localStorage.setItem("user", this.state.username);
        alert("profile updated successfully!");
        window.open(`/users/${newUser}`, "_self");
      });
  };

  deleteProfile() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://movieflixappbyedwin.herokuapp.com/users/${username}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .catch((e) => console.log(e));
  }

  setUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  setPassword(value) {
    this.setState({
      password: value,
    });
  }
  setEmail(value) {
    this.setState({
      email: value,
    });
  }
  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }
  removeFav(movieId) {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios
      .delete(
        `https://movieflixappbyedwin.herokuapp.com/users/${user}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert(`The movie was successfully deleted.`);
        window.open(`/users/${user}`, "_self");
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, username } = this.state;
    if (!username) {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editProfile(
                      e,
                      this.username,
                      this.password,
                      this.email,
                      this.birthday
                    )
                  }
                >
                  <Container>
                    <Container className="flex-item pt-5">
                      <div className="profile-form-title">
                        Your myFlix Profile
                        <FormControl
                          type="text"
                          name="username"
                          placeholder="New Username"
                          onChange={this.setUsername}
                          required
                        />
                        <Form.Text className="text-muted">
                          Your username should be at least 2 characters long
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="text"
                          name="password"
                          placeholder="New Password"
                          onChange={(e) => this.setPassword(e.target.value)}
                          required
                        />
                        <Form.Text className="text-muted">
                          Your password should be at least 6 characters long
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column mb-2">
                        <FormControl
                          type="email"
                          name="email"
                          placeholder="New Email"
                          onChange={(e) => this.setEmail(e.target.value)}
                          required
                        />
                        <Form.Text className="text-muted">
                          Enter a valid e-mail address
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="date"
                          name="birthday"
                          placeholder="insert your new email here"
                          onChange={(e) => this.setBirthday(e.target.value)}
                          required
                        />
                      </div>
                    </Container>
                  </Container>
                  <Container className="mt-2 text-center">
                    <Button
                      id="button-main"
                      type="submit"
                      onClick={this.editProfile}
                    >
                      Update Info!
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
            <Card className="mt-2 mb-2">
              <Container className="p-1 text-center card-custom">
                <Button
                  style={{ width: "80%" }}
                  className="custom-btn-delete m-1"
                  variant="outline-danger"
                  type="submit"
                  onClick={this.deleteProfile}
                >
                  Delete Profile
                </Button>{" "}
              </Container>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            {favoriteMovies.length === 0 && (
              <div className="titles h1 text-center">
                <h3>No Favorite Movies Yet</h3>
                <p className="h5">
                  <Link to={`/`}>
                    <Button id="button-main" type="submit">
                      Back
                    </Button>
                  </Link>
                </p>
              </div>
            )}
            <Row className="favorite-movies d-flex justify-content-around">
              {favoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    favoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card id="fav-movie-card" key={movie._id}>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img
                            variant="top"
                            crossOrigin="anonymous"
                            src={movie.ImagePath}
                            id="img-responsive"
                          />
                        </Link>

                        <Card.Body>
                          <Card.Title className="h1 titles">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            id="button-main"
                            onClick={() => this.removeFav(movie._id)}
                          >
                            Remove From Favorites
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
