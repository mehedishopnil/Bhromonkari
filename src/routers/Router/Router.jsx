import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../Page/Home/Home";
import Dashboard from "../../layout/Dashboard/dashboard";
import TourPlan from "../../Page/TourPlan/TourPlan";
import Bookings from "../../Page/Bookings/Bookings";
import Login from "../../Page/Login/Login";
import Registration from "../../Page/Registration/Registration";
import Overview from "../../Page/Overview/Overview";
import Expanse from "../../Page/Expanse/Expanse";
import BudgetPlan from "../../Page/BudgetPlan/BudgetPlan";
import Profile from "../../Page/Profile/Profile";

export const router = createBrowserRouter([
    {
        path: '/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path: 'tour-plan',
                element: <TourPlan></TourPlan>
            },
            {
                path: 'bookings',
                element: <Bookings></Bookings>
            }, 
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'registration',
                element: <Registration></Registration>
            }
            
        ]
    },

    {
        path: 'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path: 'overview',
                element: <Overview></Overview>
            
            },
            {
                path: 'expanse',
                element: <Expanse></Expanse>
            },
            {
                path: 'budget-plan',
                element: <BudgetPlan></BudgetPlan>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }
            
        ]
    }
])