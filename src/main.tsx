import { StrictMode } from 'react'; // Import StrictMode from React to highlight potential problems in an application
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client to create a root for rendering
import App from './App.tsx'; // Import the main App component
import './index.css'; // Import global CSS styles

// Create a root and render the App component inside StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
); 

