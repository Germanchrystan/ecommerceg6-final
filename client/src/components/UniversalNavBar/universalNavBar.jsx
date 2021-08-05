import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProducts } from '../../redux/actions/products_actions'
import decode from "jwt-decode";
import logoTransparent from "../../assets/logo_transparent.png"
import swal from 'sweetalert';
import carroHome from '../../assets/carroHome.png'
import corona from "../../assets/corona.jpg";

import "./universalNavBar.css";

export default function UniversalNavBar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const [input, setInput] = useState({name: ""});

  const [selectedProduct, setSelectedProduct] = useState(false);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      setUser(JSON.parse(localStorage.getItem("profile")));
    }

    if (input.name !== "") {
      dispatch(searchProducts(input.name));
    }
  }, [location, input]);

  const completeInput = (name) => {
    setInput({ ...input, name: name });
    setSelectedProduct(true);
  };

  function handleChange(e) {
    setInput({
      name: e.target.value,
    });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (input.name === "") {
      swal({
        title: "Search Not Valid",
        icon: "warning",
        button: true,
      }).then(function () {
        window.location.reload();
      });
    }
  }

  return (
    <div className="header-container">

      <header className="header tracking-wide">
        <Link to="/" className="logo-link">
        {
            window.location.pathname === "/" &&

            <img alt="logo" className="logo-original" src={logoTransparent} ></img>

          }
          {
            window.location.pathname !== "/" &&
            <img alt="logo" className="logo-alt" src={corona}></img>
          }

        </Link>

        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" for="menu-btn">
          <span className="navicon"></span>
        </label>
        {window.location.pathname === "/Shop" && (
          <div id="responsiveSearch" style={{display:'flex', width:'fit-content'}} className=" flex-col lg:ml-96 ml-24 ">
            <input
              onKeyPress={handleKeyPress}
              className="w-44 lg:w-80 md:w-60 border-2 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
              style={{margin:'0.75rem 0', background:'white', borderWidth: '2px'}}
              type="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />

          </div>
        )}
        <ul className="menu">  
        {/* style={{position:'relative', top:'10%', right:0}} */}
          <li style={{fontFamily: "'Josefin Sans', sans-serif"}} className="header-menu-item">
            <Link to="/Shop">Shop</Link>
          </li>
          {user?.result?.username ? (
            <li style={{fontFamily: "'Josefin Sans', sans-serif"}} className="header-menu-item">
              <Link to="/myProfile">{user.result.username}</Link>
            </li>
          ) : (
            <li style={{fontFamily: "'Josefin Sans', sans-serif"}} className="header-menu-item">
              <Link to="/auth">Log In</Link>
            </li>
          )}

          {user?.result?._id ? (
            <li className="header-menu-item">
              <Link to={`/cart/${user.result._id}`}>
                <img
                  className="mx-auto"
                  width="24px"
                  height="24px"
                  src={carroHome}
                  alt="cart"
                ></img>
              </Link>
            </li>
          ) : (
            <li className="header-menu-item">
              <Link to={"/cart/"}>
                <img
                  className="mx-auto"
                  width="24px"
                  height="24px"
                  src={carroHome}
                  alt="logo cart"
                ></img>
              </Link>
            </li>
          )}
        </ul>
        <br />

      </header>
    </div>
  );
}
