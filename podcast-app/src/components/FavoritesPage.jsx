import React from 'react';
import { useFavorites } from './FavoriteEpisodes';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  const formatDateTime = (timestamp) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleDateString('en-UK', options);
  };

  const groupedFavorites = favorites.reduce((acc, favorite) => {
    if (!acc[favorite.podcastTitle]) {
      acc[favorite.podcastTitle] = [];
    }
    acc[favorite.podcastTitle].push(favorite);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Favorites ❤️ </h1>
      {Object.keys(groupedFavorites).length === 0 ? (
        <div>No favorites added yet</div>
      ) : (
        Object.keys(groupedFavorites).map(podcastTitle => (
          <div key={podcastTitle} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{podcastTitle}</h2>
            <ul className="list-disc pl-10">
              {groupedFavorites[podcastTitle].map(favorite => (
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
    </div>
  );
};

export default FavoritesPage;
