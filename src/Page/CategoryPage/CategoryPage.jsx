import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const location = useLocation(); // Get current location

  useEffect(() => {
    if (!loading && !user) {
      // Set redirectToLogin to true only if user is not authenticated and not loading
      setRedirectToLogin(true);
    }
  }, [user, loading]);

  useEffect(() => {
    if (user && category) {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://bhromonkari-server.vercel.app/tour-places');
          const filteredData = response.data.filter(item => item.category.trim().toLowerCase() === category.trim().toLowerCase());
          setCategoryData(filteredData);
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      };

      fetchData();
    }
  }, [category, user]);

  const handleLoginRedirect = () => {
    // Redirect to login page with state containing the current location
    navigate('/login', { state: { from: location } });
  };

  useEffect(() => {
    if (redirectToLogin && user) {
      // If redirected from login and now authenticated, navigate back to previous location
      const { state } = location;
      if (state && state.from) {
        navigate(state.from); // Navigate back to previous page
      } else {
        navigate(-1); // Navigate back to previous page if location state is not available
      }
    }
  }, [redirectToLogin, user, navigate, location]);

  if (redirectToLogin) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5 uppercase">
        The Beautiful Place of <span className="text-[#e0a352] uppercase">{category}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData.map((item) => (
          <div key={item.id} className="border p-4 rounded-md mb-4">
            <img src={item.image} alt={item.name} className="w-full h-[300px] mb-2" />
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="mb-2">Location: {item.location}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
