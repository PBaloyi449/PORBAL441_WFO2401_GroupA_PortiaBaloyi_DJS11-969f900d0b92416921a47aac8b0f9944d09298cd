import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from './FavoriteEpisodes';

const PodcastDetail = () => {
  const { id } = useParams();
  const { addFavorite } = useFavorites();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(null);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShow(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [id]);

  const toggleSeason = (season) => {
    if (expandedSeason === season) {
      setExpandedSeason(null);
    } else {
      setExpandedSeason(season);
    }
  };

  const formatDate = (timestamp) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-UK', options);
  };

  const handleAddToFavorites = (episode) => {
    addFavorite({
      ...episode,
      podcastId: id,
      podcastTitle: show.title,
      addedAt: new Date().toISOString()
    });
    console.log(`Added episode ${episode.title} to favorites`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!show) {
    return <div>Podcast not found</div>;
  }

  const renderSeasons = () => {
    if (!Array.isArray(show.seasons)) {
      console.error("show.seasons is not an array:", show.seasons);
      return <div>No seasons found for this podcast</div>;
    }

    return (
      <div className="flex">
        <div className="w-1/4 pr-8">
          <div className="sticky top-0">
            <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
            {show.seasons.map((season, index) => (
              <button
              key={season.title}
              className={`block text-left w-full text-lg font-semibold mb-2 focus:outline-none ${
                expandedSeason === season ? 'bg-gray-300' : ''
              }`}
              onClick={() => toggleSeason(season)}
            >
              <div className="flex items-center">
                {season.image && (
                  <img
                    src={season.image}
                    alt={`Season ${season.season} Image`}
                    className="w-16 h-16 rounded-full mr-2"
                  />
                )}
                <span>{index + 1}. Season {season.season} ({season.episodes.length} episodes)</span>
              </div>
            </button>
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <div className="mb-8 flex">
            <img 
              src={show.image} 
              alt={show.title} 
              className="w-32 h-auto rounded-lg shadow-lg mr-8"
            />
            <div>
              <h1 className="text-3xl font-bold mb-4">{show.title}</h1>
              <p className="text-lg mb-2">Genres: {show.genres.join(', ')}</p>
              <p className="text-lg mb-2">Last Updated: {formatDate(show.updated)}</p>
            </div>
          </div>
          <div className="grid gap-8">
            {show.seasons.map(season => (
              <div key={season.title} className={expandedSeason === season ? 'block' : 'hidden'}>
                <div className="grid gap-4">
                  {season.episodes.map(episode => (
                    <div key={episode.title} className="p-4 bg-gray-200 rounded-lg shadow flex items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">{episode.title}</h4>
                        <p className="mb-2">{episode.description}</p>
                        <audio controls className="mb-2">
                          <source src={episode.file} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                      <button
                        className="ml-4 text-lg text-white bg-black rounded-md px-3 py-2 hover:bg-blue-600 focus:outline-none"
                        onClick={() => handleAddToFavorites(episode)}
                      >
                        ❤️ Add to Favorites
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8">
      {renderSeasons()}
    </div>
  );
};

export default PodcastDetail;
