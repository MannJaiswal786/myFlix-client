// Import react components to use inside the view
import React from "react";
import { Button } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    //Display a div container which displays the data from the routes defined inside the main view
    return (
      <div className="genre-view ">
        <div className="genre-name">
          <h1>
            <span className="value">{genre.Name}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>

        <Button
          // Button to go back to the movie-view
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

export default GenreView;
