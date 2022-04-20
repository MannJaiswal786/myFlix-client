//Import React Components to use inside the movie card view
import React from "react";
import propTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Link to the router defined inside the main-view
import { Link } from "react-router-dom";

// Render the movie data inside a react card specifically an Image, Title and Description
// Add a button to View more info
// When clicked on view info, navigate to the single movie view component
export class MovieCard extends React.Component {
  render() {
    const { movie, addMovieToFav, user, deleteMovieFromFav } = this.props;
    console.log(user);
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button className="viewinfo mt-4" variant="info">
              View Info
            </Button>
          </Link>
          {user.FavoriteMovies && user.FavoriteMovies.includes(movie._id) ? (
            <Button
              onClick={() => {
                deleteMovieFromFav(movie._id);
              }}
              className="viewinfo ml-2 mt-4"
              variant="info"
            >
              Remove from favorite
            </Button>
          ) : (
            <Button
              onClick={() => {
                addMovieToFav(movie._id);
              }}
              className="viewinfo ml-4 mt-4"
              variant="info"
            >
              Add to favorite
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }
}

// Proptypes for the MovieCard state
MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
  }),
  // onMovieClick: propTypes.func.isRequired,
};
