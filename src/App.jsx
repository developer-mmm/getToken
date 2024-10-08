import { useEffect } from "react";
import { axiosClient } from "./utils/axiosClient";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const {user, pending} = useSelector((state)=> state.user)
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);

useEffect(()=>{
  dispatch(checkUser())
},[])

if(pending){
  return <h1>Loading...</h1>
}

  return <RouterProvider router={routes} />;
}

export default App;
