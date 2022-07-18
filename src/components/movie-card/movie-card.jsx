import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// styling
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

// export MovieCard class component
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />

        <Card.Body>
          <Card.Title style={{ color: "darkseagreen" }}>
            {movie.Title}
          </Card.Title>
          <Card.Text>
            {movie.Genre.Name} - {movie.Director.Name}
          </Card.Text>

          <div>
            <Link to={`/movies/${movie._id}`}>
              <Button id="button-main">Open</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

// static propTypes properties for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
};
