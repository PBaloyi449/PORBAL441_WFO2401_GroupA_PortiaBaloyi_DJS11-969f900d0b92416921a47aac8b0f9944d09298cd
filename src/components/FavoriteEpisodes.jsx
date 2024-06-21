import React, { useState, useContext, createContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage if available
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    // Save favorites to localStorage whenever favorites change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (favorite) => {
    setFavorites([...favorites, favorite]);
  };

  const removeFavorite = (favoriteToRemove) => {
    setFavorites(favorites.filter(favorite => favorite.title !== favoriteToRemove.title));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};




