import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import MovieList from './common/MovieList';


const StoreFront = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Video Store
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <MovieList />
      </Container>
    </React.Fragment>
  );
}

export default StoreFront;