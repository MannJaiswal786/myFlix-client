import React from "react";
import { Button } from "react-bootstrap";
import "./genre-view.scss";
export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view ">
        <div className="genre-name">
          <h1>
            <span className="value">{genre.Name}</span>
          </h1>
        </div>
        <div className="genre-description movie">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        {/*<div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>*/}
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

export default GenreView;
