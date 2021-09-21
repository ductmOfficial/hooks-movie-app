import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <ImageListItem>
      <img
        src={`${poster}?w=248&fit=crop&auto=format`}
        srcSet={`${poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={movie.Title}
        loading="lazy"
      />
      <ImageListItemBar
        title={movie.Title}
        subtitle={<span>{movie.Year}</span>}
        position="below"
      />
    </ImageListItem>
  );
};

export default Movie;
