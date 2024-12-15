import { StrictMode } from "react"; // Import React for StrictMode
import { createRoot } from "react-dom/client"; // Correct import for createRoot
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Correct imports from react-router-dom
import "./index.css";
import App from "./App.tsx";
import Tasks from "./components/Tasks.tsx";


// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },

    ],
  },
]);

// Create the root element using createRoot
const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

// Render the application with RouterProvider
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
