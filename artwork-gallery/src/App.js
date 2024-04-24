import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArtworkList from './ArtworkList';
import ArtworkDetails from './ArtworkDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ArtworkList />} />
        <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
      </Routes>
    </div>
  );
}

export default App;
