import React from 'react';
import Carousel from './components/SlidingCorousel';
import Navbar from './components/Navbar';
import { Route, Routes, Link } from 'react-router-dom';
import PodcastDetail from './components/PodcastDetails';
import FavoritesPage from './components/FavoritesPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Dashboard = ({ shows, filter, filteredShows, randomShows, isOpen, toggleSidebar, setFilter }) => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen flex relative">
      {/* Sidebar toggle button */}
      {!isOpen && (
        <button 
          className="absolute top-20 left-4 z-10 text-gray-600"
          onClick={toggleSidebar}
        >
          👁️👁️
        </button>
      )}

      {/* Sidebar and main content structure */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Header />
        <div className="w-[60%] m-auto pt-11">
          <Carousel casts={randomShows} />
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
  );
}

export default Dashboard;
