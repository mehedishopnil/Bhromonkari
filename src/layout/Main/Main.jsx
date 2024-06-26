import { Outlet } from "react-router-dom";
import Header from "../../Page/Shared/Header/Header";
import Footer from "../../Page/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className="">
            <Header></Header>

            <div className="">
            <Outlet></Outlet>
            </div>
            
            <Footer></Footer> 
            
        </div>
    );
};

export default Main;