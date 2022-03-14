// Import React, proptypes, react bootstrap to use inside the project file
import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./movie-view.scss";

//
export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  // Add a keypress Callback event to go back
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  // Remove the Keypress callback event
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  // Render the movie view to display
  render() {
    const { movie, onBackClick } = this.props;

    return (
      // Return a div container to display an image, description, genre and director of the movie
      <div className="movie-view movie ">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title movie">
          <span className="label"> Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description movie">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre movie">
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant="link" className="genrelink">
              Genre:
            </Button>
          </Link>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director movie">
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant="link">Director:</Button>
          </Link>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <Button
          className="btn-primary btn-back"
          variant="info"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

// Proptypes for the movie view
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    Genre: PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
