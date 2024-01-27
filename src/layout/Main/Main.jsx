import { Outlet } from "react-router-dom";
import Header from "../../Page/Shared/Header/Header";
import Footer from "../../Page/Shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;