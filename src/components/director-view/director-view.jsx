import React, { useState, useEffect } from "react";
import "./profile-view.scss";
import { Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const ProfileView = (props) => {
  const [userData, setUserData] = useState({});
  const [moviesData, setMoviesData] = useState([]);
  useEffect(() => {
    if (props.movies) {
      setMoviesData(props.movies);
    }
  }, [props.movies]);
  useEffect(() => {
    let user = localStorage.getItem("user");
    setUserData(JSON.parse(user));
  }, []);

  const handleMovie = (fav) => {
    return moviesData.find((item) => item._id === fav);
  };
  return (
    <div className="profile-view ">
      <div className="profile-name">
        <h4>
          <span className="label">User: {userData.Username} </span> <br />
        </h4>
      </div>
      <div className="profile-description movie">
        <span className="label">Email: </span>
        <span className="value">{userData.Email}</span>
      </div>
      <div className="profile-description movie">
        <span className="label">Favorite Movies: </span>
        <Row>
          {userData.FavoriteMovies &&
            moviesData &&
            moviesData.length > 0 &&
            userData.FavoriteMovies.map((m) => (
              <Col md={6}>
                <MovieCard
                  movie={handleMovie(m)}
                  user={userData}
                  deleteMovieFromFav={props.deleteMovieFromFav}
                  addMovieToFav={props.addMovieToFav}
                ></MovieCard>
              </Col>
            ))}
        </Row>
      </div>

      <Button
        className="btn-primary btn-back"
        variant="info"
        onClick={() => {
          props.onBackClick(null);
        }}
      >
        Back
      </Button>
    </div>
  );
};
