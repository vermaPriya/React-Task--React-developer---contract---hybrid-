import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=10`);
        const data = await response.json();
        setArtworks(data.data);
        setTotalPages(data.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, [currentPage]);

  useEffect(() => {
    setFilteredArtworks(artworks.filter(artwork => artwork.title.toLowerCase().includes(searchTitle.toLowerCase())));
  }, [artworks, searchTitle]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div className="artwork-list">
      <h1>Artwork List</h1>
      <input
      type="text"
      placeholder="Search by title"
      value={searchTitle}
      onChange={handleSearch}
      className="search-bar"
    />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredArtworks.map(artwork => (
            <tr key={artwork.id}>
              <td>{artwork.title}</td>
              <td>
                <Link to={`/artwork/${artwork.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default ArtworkList;
