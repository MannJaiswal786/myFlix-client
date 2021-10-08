import React from "react";
import propTypes from "prop-types";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div
        className="movie-card"
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Featured: propTypes.bool,
    Genre: propTypes.shape({
      Name: propTypes.string,
      Description: propTypes.string,
    }),
    Director: propTypes.shape({
      Name: propTypes.string,
      Bio: propTypes.string,
      Birth: propTypes.string,
    }),
  }),
  onMovieClick: propTypes.func.isRequired,
};
