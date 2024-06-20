import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import { FavoritesProvider } from './components/FavoriteEpisodes';
import './index.css'

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <Router>
          <App />
      </Router>
    </FavoritesProvider>
  </React.StrictMode>
);