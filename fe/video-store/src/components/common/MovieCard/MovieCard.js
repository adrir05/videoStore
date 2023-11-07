import React from "react";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import { styled } from '@mui/system';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const StyledCard = styled(Card)({
  maxWidth: 275,
  margin: 10,
});

const MovieCard = ({ movie, callback }) => {

  const handleOnClick = (movie) => {
    fetch('http://localhost:3000/api/v1/movies/increment_likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie: { id: movie.id } })
    })
      .then(response => {
        if (response.ok) {
          
          return response.json();
        } else {
          throw new Error('Error incrementing likes');
        }
      })
      .then(movie => {
        console.log(movie);
        callback(movie);
      })
      .catch(error => console.error('Error:', error));
  };

    return (
        <StyledCard key={movie.id}>
          <CardContent>
            <Grid container spacing={2}>

            </Grid>
            <Typography variant="h4" sx={{ fontSize: 14 }}>{movie.name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Button
                onClick={() => handleOnClick(movie)}
                startIcon={<ThumbUpIcon/>}
                color="primary"
                variant="contained"
                aria-label="add to favorites"
              >
                {movie.like_counter}
              </Button>
            </Box>
          </CardContent>
        </StyledCard>
    );
}

export default MovieCard;