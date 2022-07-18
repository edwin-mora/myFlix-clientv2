import React from "react";
import Link from "react-router-dom";
import { Col, Row, Figure, Button } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMoviesList.map((ImagePath, Title, _id) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image
                      crossOrigin="anonymous"
                      src={ImagePath}
                      alt={Title}
                    />

                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant="secondary"
                  onClick={() => removeFav(movies._id)}
                >
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
      <Container></Container>
    </Card>
  );
}

export default FavoriteMovies;
