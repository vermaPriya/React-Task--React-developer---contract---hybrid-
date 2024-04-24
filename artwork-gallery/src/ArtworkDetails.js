// ArtworkDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ArtworkDetails = () => {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState(null);
// Fetching details on basis of id by using API 
  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}`);
        const data = await response.json();
        console.log(data)
        setArtwork(data.data);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      }
    };

    fetchArtworkDetails();
  }, [artworkId]);

  return (
    <div className="artwork-details-container">
      <div className="artwork-details-card">
        <div className="artwork-details-header">
          <h2 className="artwork-title">{artwork && artwork.title}</h2>
          <div className="back-button">
            <Link to="/">Back</Link>
          </div>
        </div>
        <div className="artwork-details-content">
          {artwork && (
            <div>
              <p>Artist: {artwork.artist_display}</p>
              <p>Date: {artwork.date_display}</p>
              <p>Main Reference Number: {artwork.main_reference_number}</p>
              <p>Dimensions: {artwork.dimensions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
