import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//styling
import { Button, Card, Row } from "react-bootstrap";
import "./director-view.scss";

// export DirectorView class component
export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Row className="director-view">
        <Card id="director-card" border="light">
          <Card.Title style={{ color: "darkseagreen" }}>
            {director.Name}
          </Card.Title>

          <Card.Text>
            <span style={{ color: "darkseagreen" }}>Description: </span>
            <span className="value">{director.Bio}</span>
          </Card.Text>

          <Card.Text className="director-birth">
            <span style={{ color: "darkseagreen" }}>Birth: </span>
            <span className="value">{director.Birth}</span>
          </Card.Text>

          <Card.Text className="director-death">
            <span style={{ color: "darkseagreen" }}>Death: </span>
            <span className="value">{director.Death}</span>
          </Card.Text>

          <div className="director-movies">
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

// static propTypes properties for DirectorView
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
};
