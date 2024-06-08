import  { useContext } from 'react';
import { AuthContext } from "../../providers/AuthProviders";
import EmptyData from '../../components/EmptyData';
import { Link } from 'react-router-dom';

const Expanse = () => {
    const { spendingData } = useContext(AuthContext);
    

        // Handle the case when budgetData is null
  if (!spendingData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <EmptyData/>
        <div className="text-center">
          <h2 className="text-xl mb-10">You didn't input your budget plan yet.</h2>
          <Link to="../budget-plan" className=" border-2 border-blue-300 rounded px-5 py-3 hover:bg-blue-300 ">
            Go to Budget Plan
          </Link>
        </div>
      </div>
    );
  }

        return (
            <div>
                <h2>Here will be expanse related work</h2>
                {/* Render your expanse related data here */}
            </div>
        );
    };

export default Expanse;
