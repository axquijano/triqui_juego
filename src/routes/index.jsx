import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "../Components/Table/index";
import Welcome from "../Components/Welcome/index"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },
    {
        path: "/juego",
        element: <Table></Table>
    }
]);

export const MyRoutes = () => {
    return (
        <RouterProvider router={router} />
    );
}