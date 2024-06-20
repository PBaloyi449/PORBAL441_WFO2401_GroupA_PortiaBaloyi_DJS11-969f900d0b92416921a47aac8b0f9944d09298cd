import React, { createContext, useState, useContext } from 'react';

const FavoriteEpisodes = createContext();

export const useFavorites = () => {
  return useContext(FavoriteEpisodes);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addFavorite = (episode) => {
    const newFavorites = [...favorites, episode];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (episode) => {
    const newFavorites = favorites.filter(fav => fav.title !== episode.title || fav.podcastTitle !== episode.podcastTitle);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <FavoriteEpisodes.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteEpisodes.Provider>
  );
};
