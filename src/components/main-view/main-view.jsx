import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

 class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Zodiac', Description: 'Movie1', ImagePath: '...', Genre: 'Thriller', Director: 'David Fincher'},
                { _id: 2, Title: 'Taxi Driver', Description: 'Movie2', ImagePath: '...', Genre: 'Drama', Director: 'Martin Scorsese'},
                { _id: 3, Title: 'Avatar', Description: 'Movie3', ImagePath: '...', Genre: 'Animation', Director: 'James Cameron'},
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie){
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }
    

    render() {
        const {movies, selectedMovie} = this.state;

        if (movies.length === 0)
         return <div className="main-view">The list is empty!</div>;
         
          return (
            <div className="main-view">
             {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
             :movies.map(movie => (
             <MovieCard key={movie._id} movie={movie} onMovieClick
              ={(movie) => {this.setSelectedMovie(movie)}} />
              ))
              }
            </div>
          );
        }
 }
    

export default MainView;