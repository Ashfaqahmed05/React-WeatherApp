import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './view/main';
import History from "./view/history";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/history",
    element: <History/>
  },
]);

function Router(){
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;