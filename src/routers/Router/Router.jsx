import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../Page/Home/Home";
import Dashboard from "../../layout/Dashboard/dashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            
        ]
    },

    {
        path: 'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                
            },
            
        ]
    }
])