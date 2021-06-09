import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
import SearchBar from '../../components/SearchBar/searchBar'
import { Link, useLocation, useHistory } from 'react-router-dom'
import './navBar.css'
import { useDispatch } from 'react-redux';


export default function NavBar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        console.log("Session expired!");
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/shop");
    setUser(null);
  };

  return (
    /* TITULO ---- */
    <div className="tracking-wide font-bold">
      <nav className="bg-yellow-300 shadow">
        <div className="container mx-auto -px-0 py-1 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div>
              <a
                className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
                href="/"
              >
                E-Commerce
              </a>
            </div>

            {/*  <!-- Mobile menu button --> */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* PARTE ABAJO DEL BUSCADOR  */}
          {/*   <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div className="mt-1 py-3 -mx-3 overflow-y-auto whitespace-no-wrap scroll-hidden">
            <SearchBar />
          </div>

          {/* MENU ----- */}
          <div className="md:flex items-center">
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link to="/">
                <a
                  className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-20 md:my-0"
                  href="/"
                >
                  Home
                </a>
              </Link>
              <Link to="/Shop">
                <div className="p-25">
                  <div className="dropdown inline-block relative">
                    <button className="bg--300 text-gray-700 font-semibold  px-1 rounded inline-flex items-center">
                      <span className="mr-1">Shop</span>
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                      </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                      <Link to="/Shop/Men">
                        <li className="">
                          <a
                            className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            href="/"
                          >
                            Men
                          </a>
                        </li>
                      </Link>
                      <Link to="/Shop/Woman">
                        <li className="">
                          <a
                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            href="/"
                          >
                            Woman
                          </a>
                        </li>
                      </Link>
                      <Link to="/Shop/Accesories">
                        <li className="">
                          <a
                            className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            href="/"
                          >
                            Accesories
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </Link>
              <Link to="/SignIn">
                <a
                  className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-20 md:my-0"
                  href="/"
                >
                  Sign in
                </a>
              </Link>
            </div>

            <div className="flex justify-center md:block">
              <a
                className="relative text-gray-700 hover:text-gray-600"
                href="/"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
