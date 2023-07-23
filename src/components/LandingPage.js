import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=37248597-928aeda6430d5b98d87a18258&q=${searchQuery}`
      );
      setSearchResults(response.data.hits);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const addToFavorites = (image) => {
    if (!favorites.find((favImage) => favImage.id === image.id)) {
      setFavorites([...favorites, image]);
    }
  };

  const removeFromFavorites = (image) => {
    const updatedFavorites = favorites.filter((favImage) => favImage.id !== image.id);
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="img-search">
          <h1 className="img-text">Search Image</h1>
          <input
            className="img-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='LandingBtn' onClick={handleSearch}>Search</button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="img-results">
              {searchResults.map((image) => (
                <div key={image.id} className="img-item-container">
                  <img
                    src={image.previewURL}
                    alt={image.tags}
                    className="img-item"
                  />
             <button className="add-to-favorites-button" onClick={() => addToFavorites(image)}>
                    {favorites.find((favImage) => favImage.id === image.id)
                      ? 'Added to Favorites'
                      : 'Add to Favorites'}
                  </button>
                </div>
              ))}
            </div>

            {/* Add to Favorites section */}
            <div className="add-to-favorites-section">
              <h2>Favorites Images</h2>
              <div className="my-masonry-grid">
                {favorites.map((image) => (
                  <div key={image.id} className="img-item-container">
                    <img src={image.previewURL} alt={image.tags} className="img-item" />
                    <button className="remove-from-favorites-button" onClick={() => removeFromFavorites(image)}>
                      Remove from Favorites
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
