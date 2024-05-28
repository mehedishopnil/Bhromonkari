import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const Login = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
    .then((result) =>{
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Successfully Logged In ",
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      });
      setIsLoggedIn(true);
      navigate(from , {replace: true});
    })
    .catch ((error) =>{
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Email or Password",
        footer: "Please enter correct Email or Password",
      });
    })

  }


  
  return (
    <div
      className=" flex justify-center items-center h-full  bg-base-100"
    >
      <div
        className="hero w-full h-auto p-10  rounded bg-base-200"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center text-2xl font-bold pt-4">LogIn</h1>

            <form onSubmit={handleLogin}  className="card-body">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
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
                    required
                  />
                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt link link-hover text-[#D1A054]"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="">
                  <label className="text-[#D1A054]">
                    
                  </label>
                  <input
                    type="text"
                    
                    placeholder="type the captcha"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* TODO: here need to disable */}
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    disabled={false}
                    className="btn bg-[#D1A054] text-white hover:bg-[#b18441]"
                  />
                </div>
                <p>
                  Do not have Account? Please{" "}
                  <Link
                    to={"/registration"}
                    className="font-bold text-[#D1A054]"
                  >
                    Register
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
    </div>
  );
};

export default Login;
