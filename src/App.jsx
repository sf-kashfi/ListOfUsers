import "./App.css";
import { useGetUsersQuery } from "./service/service";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Typography,
  TextField,
  Avatar,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "./FavoriteSlice";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, error, isLoading } = useGetUsersQuery(searchTerm);
  // const { data: favoritesData } = useGetFavoritesQuery();
  // const [addFavorite] = useAddFavoriteMutation();
  // const [removeFavorite] = useRemoveFavoriteMutation();

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading users!</Typography>;

  // const isFavorite = (userId) => favorites?.some((fav) => fav.id === userId);

  // const handleFavoriteToggle = async (user) => {
  //   const isFavorite = favorites.some((fav) => fav.id === user.id);
  //   if (isFavorite) {
  //     const favoriteItem = favorites.find((fav) => fav.id === user.id);
  //     await removeFavorite(favoriteItem.id);
  //   } else {
  //     await addFavorite(user);
  //   }
  //   dispatch(toggleFavorite(user));
  // };

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        List Of Users
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredUsers?.map((user) => {
          // const isFavorite = favorites?.some((fav) => fav.id === user.id);
          const isFavorite =
            Array.isArray(favorites) &&
            favorites.find((fav) => fav.id === user.id);

          return (
            <ListItem
              key={user.id}
              divider
              secondaryAction={
                <IconButton
                  onClick={() => dispatch(toggleFavorite(user))}
                  edge="end"
                >
                  {isFavorite ? (
                    <Star style={{ color: "gold" }} />
                  ) : (
                    <StarBorder />
                  )}
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

export default App;
