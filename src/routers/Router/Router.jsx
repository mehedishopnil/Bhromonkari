import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../Page/Home/Home";
import TourPlan from "../../Page/TourPlan/TourPlan";
import Bookings from "../../Page/Bookings/Bookings";
import Login from "../../Page/Login/Login";
import Registration from "../../Page/Registration/Registration";
import Overview from "../../Page/Overview/Overview";
import Expanse from "../../Page/Expanse/Expanse";
import BudgetPlan from "../../Page/BudgetPlan/BudgetPlan";
import Profile from "../../Page/Profile/Profile";
import CategoryPage from "../../Page/CategoryPage/CategoryPage";
import Dashboard from "../../layout/Dashboard/Dashboard";
import SingleTourPlace from "../../components/SingleTourPlace/SingleTourPlace";
import SingleHotel from "../../components/singleHotel/singleHotel";
import SingleTourGuide from "../../components/SingleTourGuide/SingleTourGuide";
import TestPage from "../../Page/TestPage";
import AdminPanel from "../../layout/AdminPanel/AdminPanel";
import AdminOverview from "../../Page/AdminOverview/AdminOverview";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
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
            },
            {
                path: 'category/:category',
                element: <CategoryPage></CategoryPage>
            }, 
            {
                path: 'tour-places/:_id',
                element: <SingleTourPlace></SingleTourPlace>
            },
            {
                path: 'hotel/:_id',
                element: <SingleHotel></SingleHotel>
            },
            {
                path: 'tour-guide/:_id',
                element: <SingleTourGuide></SingleTourGuide>
            },
            {
                path: 'test',
                element: <TestPage></TestPage>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
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
    },

    {
        path: '/admin',
        element: <AdminPanel />,
        children: [
            {
                path: 'admin-overview',
                element: <AdminOverview />
            }
        ]
    }
]);
