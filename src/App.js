import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

import './App.css';
import Hero from './components/Hero';
import Movie from './components/Movie';
import Search from './components/Search';
import { initialState, reducer } from './store/reducer';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=9f2d1fd2';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  const search = (searchValue) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      (jsonResponse) => {
        if (jsonResponse.data.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.data.Search,
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.data.Error,
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <Hero>
        <Search search={search} />
      </Hero>

      <Container maxWidth="md">
        <ImageList sx={{}} cols={4} gap={20}>
          {retrievedMovies}
        </ImageList>
      </Container>
    </div>
  );
};

export default App;
