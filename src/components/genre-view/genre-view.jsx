import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// // sytling
import { Button, Card, Row } from "react-bootstrap";
import "./genre-view.scss";

// export GenreView class function
export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Row id="genre-view">
        <Card id="genre-card" border="light">
          <Card.Title style={{ color: "darkseagreen" }}>
            {genre.Name}
          </Card.Title>

          <Card.Text>
            <span id="span-back" style={{ color: "darkseagreen" }}>
              Description:{" "}
            </span>
            <span className="value">{genre.Description}</span>
          </Card.Text>

          <div className="genre-list">
            <span style={{ color: "darkseagreen" }}>Movies: </span>
            {movies.map((m) => (
              <div className="movie" key={m._id}>
                {m.Title}
              </div>
            ))}
          </div>

          <Link to={"/"}>
            <Button id="button-main">Back</Button>
          </Link>
        </Card>
      </Row>
    );
  }
}

// static propTypes properties for GenreView
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
