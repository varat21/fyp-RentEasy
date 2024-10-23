// Import React and necessary packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Import custom styles and Mantine's core styles
import './index.css';
import '@mantine/core/styles.css';

// Render the root component inside the StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
