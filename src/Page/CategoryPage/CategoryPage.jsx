import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import Loading from '../../components/Loading';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setRedirectToLogin(true);
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bhromonkari-server.vercel.app/tour-places');
        const filteredData = response.data.filter(item => item.category.trim().toLowerCase() === category.trim().toLowerCase());
        setCategoryData(filteredData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category]);

  useEffect(() => {
    if (redirectToLogin && user) {
      const { state } = location;
      if (state && state.from) {
        navigate(state.from);
      } else {
        navigate(-1);
      }
    }
  }, [redirectToLogin, user, navigate, location]);

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5 uppercase">
        The Beautiful Place of <span className="text-[#e0a352] uppercase">{category}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData.map((item) => (
          <Link to={`/tour-places/${item._id}`} key={item.id}>
            <div className="border p-4 rounded-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <img src={item.image} alt={item.name} className="w-full h-[300px] object-cover mb-2 rounded-md" />
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="mb-2">Location: {item.location}</p>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
