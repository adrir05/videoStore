import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard/MovieCard";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [addMovie, setAddMovie] = useState(false);
  const [newMovieName, setNewMovieName] = useState("");
  const handleOpen = () => setAddMovie(true);
  
  const handleClose = () => {
    setAddMovie(false);
    setNewMovieName("");
  };

  useEffect(() => {
    if (movies.length === 0) {
      fetch("http://localhost:3000/api/v1/movies")
        .then((response) => response.json())
        .then((json) => setMovies(json))
        .catch((error) => console.log(error));
    }
  }, [movies]);



  const handleMovieNameChange = (event) => setNewMovieName(event.target.value);

  const handleSave = () => {
    if (newMovieName === "") {
      alert("Movie name cannot be blank");
      return;
    }

    fetch("http://localhost:3000/api/v1/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie: { name: newMovieName } }),
    })
      .then((response) => {
        if (response.status === 201) {
            handleClose();
          return response.json();
        } else {
          throw new Error("Error creating movie");
        }
      })
      .then((movie) => setMovies((prevMovies) => [...prevMovies, movie]))
      .catch((error) => console.error("Error:", error));
  };

  const updateMovie = (updatedMovie) => {
    debugger;
    if (!movies.length) {
      alert('No movies available');
      return;
    }
  
    const movieExists = movies.some(m => m.id === updatedMovie.id);
    if (!movieExists) {
      alert('Movie does not exist');
      return;
    }
  
    setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
  };



  const renderHeader = () => {
    return (
      <>
        <Grid container>
          <Grid item xs={2}>
            <h1>Movie List</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ marginBottom: "15px" }}
          >
            <Grid item>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={handleOpen}
              >
                Add Movie
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderAddMovieModal = () => {
    return (
      <Dialog open={addMovie} onClose={handleClose}>
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent sx={{minWidth: "350px"}}>
          <TextField
            label="Movie Name"
            value={newMovieName}
            onChange={handleMovieNameChange}
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSave}>
            Save
        </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderMovies = () => {
    return (
      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} callback={updateMovie}/>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: "15px" }}>
      {renderAddMovieModal()}
      <Grid container spacing={2}>
        {renderHeader()}
        {movies && renderMovies()}
      </Grid>
    </Box>
  );
};

export default MovieList;
