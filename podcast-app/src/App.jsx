import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from "./components/SlidingCorousel";
import Header from './components/Header';
import PodcastDetail from './components/PodcastDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import FavoritesPage from './components/FavoritesPage';
import { FavoritesProvider } from './components/FavoriteEpisodes';
import Fuse from 'fuse.js'; // Import Fuse.js

function App() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('All'); // State for filter
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState({}); // State to hold genre details

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch podcast data
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        // Fetch genre data from genre.json
        const genreResponse = await fetch('../genre/genre.json');
        if (!genreResponse.ok) {
          throw new Error(`HTTP error! status: ${genreResponse.status}`);
        }
        const genreData = await genreResponse.json();

        // Map genres by ID for quick lookup
        const genreMap = {};
        genreData.forEach(genre => {
          genreMap[genre.id] = {
            title: genre.title,
            description: genre.description,
            shows: genre.shows
          };
        });

        const extractedData = data.map(show => {
          const {
            id = '',
            image = '',
            title = 'No Title',
            description = 'No Description',
            seasons = 0,
            genres = [],
            updated = 'Unknown Date'
          } = show;

          const genreDetails = genres.map(id => ({
            id,
            title: genreMap[id]?.title || 'Unknown Genre',
            description: genreMap[id]?.description || 'No Description'
          }));

          const formattedUpdated = new Date(updated).toLocaleDateString('en-UK', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          return { id, image, title, description, seasons, genres: genreDetails, updated: formattedUpdated };
        });

        setShows(extractedData);
        setLoading(false);
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterShows = (shows, filter) => {
    switch (filter) {
      case 'A-Z':
        return [...shows].sort((a, b) => a.title.localeCompare(b.title));
      case 'Z-A':
        return [...shows].sort((a, b) => b.title.localeCompare(a.title));
      case 'Newest':
        return [...shows].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'Oldest':
        return [...shows].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      case 'All Genres':
        return shows;
      default:
        return shows;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const fuse = new Fuse(shows, {
    keys: ['title'],
    threshold: 0.3
  });

  const searchResults = searchQuery ? fuse.search(searchQuery).map(result => result.item) : shows;
  const filteredShows = filterShows(searchResults, filter);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <FavoritesProvider>
      <div className="font-sans bg-gray-100 min-h-screen flex">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
          <Header onSearch={handleSearch} />
          {!isOpen && (
            <button 
              className="absolute top-30 left-0 m-4 text-gray-600"
              onClick={toggleSidebar}
            >
              👁️👁️
            </button>
          )}
          <div className="w-[60%] m-auto pt-11">
            <Carousel casts={casts} />
          </div>
          <Navbar setFilter={setFilter} />
          <Routes>
            <Route path="/" element={
              <div className="podcast-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
                {filteredShows.map((show, index) => (
                  <div key={index} className="podcast bg-white p-4">
                    <Link to={`/podcast/${show.id}`}>
                      <img src={show.image} alt={show.title} className="w-full h-auto mb-4 rounded" />
                      <h3 className="my-2 text-xl font-bold overflow-hidden whitespace-nowrap overflow-ellipsis text-black">{show.title}</h3>
                    </Link>
                    <p><strong>Seasons:</strong> {show.seasons}</p>
                    <p className="truncate"><strong>Genres:</strong> 
                      {show.genres.map((genre, index) => (
                        <span key={index}>
                          {genre.title}
                          {index < show.genres.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                    <p><strong>Last updated:</strong> {show.updated}</p>
                  </div>
                ))}
              </div>
            } />
            <Route path="/podcast/:id" element={<PodcastDetail shows={shows} />} />
            <Route path="/favorites" element={<FavoritesPage filter={filter} />} />
          </Routes>
        </div>
      </div>
    </FavoritesProvider>
  );
}

export default App;





