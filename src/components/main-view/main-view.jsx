// myFlix-client/src/main-view/main-view.jsx

// Imports
// Main View - Home Page
import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { Navbar } from "./../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";
export default class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      register: true,
      login: "",
    };
  }
  //history = useNavigate()

  // Configure the states and the props and display the initial UI access
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    this.setState({
      user: authData.user,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    localStorage.setItem("username", authData.user.Username);
    this.getMovies(authData.token);
  }

  // log out a user to clear out the token and user for the app
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    this.setState({
      user: null,
    });
  }

  // register a user
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  // GET movie data fromDB; getMovies methos is called with this.getMovies() in 'onLoggedIn', when right token for username is sent
  getMovies(token) {
    axios
      .get("https://downtown-cinema.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addMovieToFav(movieId) {
    let myToken = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    if (myToken !== null) {
      let token = {
        headers: { Authorization: `Bearer ${myToken}` },
      };
      var config = {
        method: "post",
        url: `https://downtown-cinema.herokuapp.com/users/${username}/movies/${movieId}`,
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      };
      axios(config)
        .then((response) => {
          getMovies(myToken);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  deleteMovieFromFav(movieId) {
    let myToken = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    if (myToken !== null) {
      let token = {
        headers: { Authorization: `Bearer ${myToken}` },
      };
      var config = {
        method: "delete",
        url: `https://downtown-cinema.herokuapp.com/users/${username}/movies/${movieId}`,
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      };
      axios(config)
        .then((response) => {
          getMovies(myToken);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  render() {
    const { movies, user, register } = this.state;

    return (
      //  All the routes are defined here
      // Route to the main view after a user logs in
      <Router>
        <Navbar onLoggedOut={this.onLoggedOut} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col md={4} key={m._id}>
                  <MovieCard
                    movie={m}
                    user={user}
                    deleteMovieFromFav={this.deleteMovieFromFav}
                    addMovieToFav={this.addMovieToFav}
                  />
                </Col>
              ));
            }}
          />

          <Route
            // navigate to the register only when there is no user created
            // If the user is logged in then is redirected to the main page which is main-view
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            // Display the list of all the movies by it's ID
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            // Display the director's info inside the director-view which is yet to be implemented
            path="/director/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              let paramName = match.params.name.replace("%20", " ");
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name == paramName).Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            // Display the list of all the movies by it's ID
            path="/genre/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name == match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            // Display the list of all the movies by it's ID
            path="/profile"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              return (
                <Col md={8}>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                    deleteMovieFromFav={this.deleteMovieFromFav}
                    addMovieToFav={this.addMovieToFav}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
