import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../Page/Home/Home";
import Dashboard from "../../layout/Dashboard/dashboard";
import TourPlan from "../../Page/TourPlan/TTourPlan";
import Bookings from "../../Page/Bookings/Bookings";
import Login from "../../Page/Login/Login";
import Registration from "../../Page/Registration/Registration";
import Overview from "../../Page/Overview/Overview";
import Expanse from "../../Page/Expanse/Expanse";
import BudgetPlan from "../../Page/BudgetPlan/BudgetPlan";
import Profile from "../../Page/Profile/Profile";
import CategoryPage from "../../Page/CategoryPage/CategoryPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,  // Ensure consistent use of <Component /> syntax
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'tour-plan',
                element: <TourPlan />
            },
            {
                path: 'bookings',
                element: <Bookings />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'registration',
                element: <Registration />
            },
            {
                path: 'category/:category',
                element: <CategoryPage />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,  // Ensure consistent use of <Component /> syntax
        children: [
            {
                path: 'overview',
                element: <Overview />
            },
            {
                path: 'expanse',
                element: <Expanse />
            },
            {
                path: 'budget-plan',
                element: <BudgetPlan />
            },
            {
                path: 'profile',
                element: <Profile />
            }
        ]
    }
]);
