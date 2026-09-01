import { createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PlayerPage from "./pages/PlayerPage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
    { path: "*", element: <ErrorPage/> },
    { path: "/", element: <SearchPage/> },
    { path: "/player/:movieId", element: <PlayerPage/> }
])