import React, { useEffect, useState } from 'react';
import { useFavorites } from './FavoriteEpisodes';

const FavoritesPage = ({ filter }) => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [sortedFavorites, setSortedFavorites] = useState([]);

  const formatDateTime = (timestamp) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleDateString('en-UK', options);
  };

  const sortFavorites = (favorites, filter) => {
    switch (filter) {
      case 'Favorites A-Z':
        return [...favorites].sort((a, b) => a.title.localeCompare(b.title));
      case 'Favorites Z-A':
        return [...favorites].sort((a, b) => b.title.localeCompare(a.title));
      case 'Newest Favorites':
        return [...favorites].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case 'Oldest Favorites':
        return [...favorites].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
      default:
        return favorites;
    }
  };

  useEffect(() => {
    setSortedFavorites(sortFavorites(favorites, filter));
  }, [favorites, filter]);

  const groupFavoritesByPodcast = (favorites) => {
    return favorites.reduce((acc, favorite) => {
      if (!acc[favorite.podcastTitle]) {
        acc[favorite.podcastTitle] = [];
      }
      acc[favorite.podcastTitle].push(favorite);
      return acc;
    }, {});
  };

  const groupedFavorites = Object.keys(groupFavoritesByPodcast(sortedFavorites))
    .map(podcastTitle => ({
      podcastTitle,
      episodes: sortedFavorites.filter(favorite => favorite.podcastTitle === podcastTitle)
    }));

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Favorites ❤️</h1>
      {groupedFavorites.length === 0 ? (
        <div>No favorites added yet</div>
      ) : (
        groupedFavorites.map((podcast, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{podcast.podcastTitle}</h2>
            <ul className="list-disc pl-10">
              {podcast.episodes.map(favorite => (
                <li key={favorite.title} className="mb-2 flex justify-between items-center">
                  <div>
                    <strong>{favorite.title}</strong> - Added on {formatDateTime(favorite.addedAt)}
                  </div>
                  <button
                    className="ml-4 text-lg text-white bg-black rounded-md px-3 py-2 hover:bg-gray-600 focus:outline-none"
                    onClick={() => removeFavorite(favorite)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <button
        className="text-lg text-white bg-red-600 rounded-md px-3 py-2 hover:bg-red-800 focus:outline-none"
        onClick={clearFavorites}
      >
        Delete All
      </button>
    </div>
  );
};

export default FavoritesPage;