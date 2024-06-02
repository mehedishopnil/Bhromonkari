import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Registration = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    createUser(name, photoUrl, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        setIsRegistration(true);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
      });
  };

  return (
    <div className="hero w-full h-auto p-10 shadow-2xl rounded bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-center text-2xl font-bold pt-4">
            Register Now
          </h1>

          <form onSubmit={handleRegistration} className="card-body">
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="input your name"
                  name="name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo url</span>
                </label>
                <input
                  type="text"
                  placeholder="input your photo url"
                  name="photoUrl"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className="btn bg-[#D1A054] text-white hover:bg-[#b18441]"
                />
              </div>
              <p className="text-center">
                Already have an account? Please{" "}
                <Link to={"/login"} className="font-bold text-[#D1A054]">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center lg:text-left">
          <img src='' alt="" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
