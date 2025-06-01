import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/sponsorship.css";

// Add error boundaries
const renderApp = () => {
  try {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering application:", error);
    // Render fallback UI
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif; text-align: center;">
          <h2>Something went wrong</h2>
          <p>The application failed to load. Please check the console for details.</p>
        </div>
      `;
    }
  }
};

renderApp();
