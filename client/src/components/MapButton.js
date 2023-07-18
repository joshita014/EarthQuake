
import { useMap } from 'react-leaflet';
import React, { useState, useEffect } from 'react';


const MapButton = () => {
  const map = useMap();
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark';
});

  const toggleTheme = () => {
    const container = map.getContainer();
    container.classList.toggle('dark-theme');
    setDarkMode(!darkMode);
    const newTheme = !darkMode ? 'dark' : 'light';
localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const container = map.getContainer();
    container.classList.toggle('dark-theme', darkMode);
}, [map, darkMode]);

  return (
    <button className="map-button" onClick={toggleTheme}>
      {darkMode ? 'Turn On Light Mode' : 'Turn On Dark Mode'}
    </button>
  );
};

export default MapButton;
