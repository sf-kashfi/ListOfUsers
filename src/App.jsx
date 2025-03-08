import { useState } from "react";
import "./App.css";
import {
  useGetUsersQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "./service/service";
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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, error, isLoading } = useGetUsersQuery(searchTerm);
  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading users!</Typography>;

  const isFavorite = (userId) => favorites?.some((fav) => fav.id === userId);

  const handleFavoriteToggle = async (user) => {
    if (isFavorite(user.id)) {
      const favorite = favorites.find((fav) => fav.id === user.id);
      await removeFavorite(favorite.id);
    } else {
      await addFavorite(user);
    }
  };

  const filteredUsers = users.filter((user) =>
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
        {filteredUsers?.map((user) => (
          <ListItem
            key={user.id}
            divider
            secondaryAction={
              <IconButton onClick={() => handleFavoriteToggle(user)} edge="end">
                {isFavorite(user.id) ? (
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
        ))}
      </List>
    </Paper>
  );
}

export default App;
