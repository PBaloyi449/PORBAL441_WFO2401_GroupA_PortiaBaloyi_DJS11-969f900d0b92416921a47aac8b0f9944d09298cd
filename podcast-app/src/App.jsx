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
import { FavoritesProvider } from './components/FavoriteEpisodes'

function App() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

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

          const genreNames = genres.map(id => {
            switch (id) {
              case 1:
                return 'Personal Growth';
              case 2:
                return 'Investigative Journalism';
              case 3:
                return 'History';
              case 4:
                return 'Comedy';
              case 5:
                return 'Entertainment';
              case 6:
                return 'Business';
              case 7:
                return 'Fiction';
              case 8:
                return 'News';
              case 9:
                return 'Kids and Family';
              default:
                return 'Unknown Genre';
            }
          }).join(', ');

          const formattedUpdated = new Date(updated).toLocaleDateString('en-UK', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          return { id, image, title, description, seasons, genres: genreNames, updated: formattedUpdated };
        });

        setShows(extractedData);
        setLoading(false);
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
        return shows; // Assuming no filtering by genres is required
      default:
        return shows;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  let casts = [
    { 
      id: 1,
      image:"https://content.production.cdn.art19.com/images/cc/e5/0a/08/cce50a08-d77d-490e-8c68-17725541b0ca/9dcebd4019d57b9551799479fa226e2a79026be5e2743c7aef19eac53532a29d66954da6e8dbdda8219b059a59c0abe6dba6049892b10dfb2f25ed90d6fe8d9a.jpeg",
      title: "Something Was Wrong",
      description: "Something Was Wrong is an Iris Award-winning true-crime docuseries about the discovery, trauma, and recovery from shocking life events and abusive relationships.",
      seasons: 14,
      genre: "Personal Growth, History"
    },
    {
      id: 2,
      image:"https://content.production.cdn.art19.com/images/5a/4f/d4/19/5a4fd419-11af-4270-b31c-2c7ed2f563a5/bc913bc926be23d04c9a4d29a829269a753be3d2612dad91f7e92ba4618fefc5c8802af29a1d32b3261eb03f83613e2535e3c574469b0cb510c32cd8d94cfaa1.png",
      title: "Something Was Wrong",
      description: "Something Was Wrong is an Iris Award-winning true-crime docuseries about the discovery, trauma, and recovery from shocking life events and abusive relationships.",
      seasons: 14,
      genre: "Personal Growth, History"
    }
    // Removed the other data
  ];

  const filteredShows = filterShows(shows, filter);

  return (
    <FavoritesProvider>
    <div className="font-sans bg-gray-100 min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> {/* Include the Sidebar component */}
      <div className="flex-1">
        <Header />
        {/* Open button for Sidebar */}
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
        <Navbar setFilter={setFilter} /> {/* Include the Navbar component here */}
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
                  <p className="truncate"><strong>Genres:</strong> {show.genres}</p>
                  <p><strong>Last updated:</strong> {show.updated}</p>
                </div>
              ))}
            </div>
          } />
          <Route path="/podcast/:id" element={<PodcastDetail shows={shows} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </div>
    </FavoritesProvider>
  );
}

export default App; 
