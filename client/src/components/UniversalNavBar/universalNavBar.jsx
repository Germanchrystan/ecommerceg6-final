import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import { Link, useLocation, useHistory, Route, Switch } from "react-router-dom";
import "./universalNavBar.css";
import { useDispatch, useSelector } from "react-redux";
import home from '../../assets/home.png'
import logoTransparent from "../../assets/logo_transparent.png"
import swal from 'sweetalert';
import carroHome from '../../assets/carroHome.png'
import { searchProducts } from '../../redux/actions/products_actions'
import corona from "../../assets/corona.jpg";

export default function UniversalNavBar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  // let productsArray = useSelector(
  //   (state) => state.productsReducer.allProducts.products
  // );

  const [input, setInput] = useState({
    name: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(false);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      setUser(JSON.parse(localStorage.getItem("profile")));
      //if (decodedToken.exp * 1000 < new Date().getTime()) console.log("Session expired!")
    }

    if (input.name !== "") {
      dispatch(searchProducts(input.name));
    }
  }, [location, input]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/shop");

    setUser(null);
  };

  function myFunction() {
    var x = document.getElementById("myTopnav");
    console.log("entra!!");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  const completeInput = (name) => {
    setInput({ ...input, name: name });
    setSelectedProduct(true);
  };

  //------------SEARCH BAR--------------------
  // const [input, setInput] = useState({
  //   name: "",
  // })

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

    // if (input.name) {
    //   dispatch(searchProducts(input.name))

    // } else
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
    <div className="">

      <header className="header tracking-wide font-bold text-center">
        <Link to="/" className="logo">
        {
            window.location.pathname === "/" &&

            <img alt="logo" src={logoTransparent} style={{ position: "absolute", top: "-12px", left: "15px", width: "200px" }}></img>

          }
          {
            window.location.pathname !== "/" &&

            <img alt="logo" src={corona} style={{ position: "absolute", top: "30px", left: "15px", width: "65px" }}></img>

          }

        </Link>

        <input className="menu-btn" type="checkbox" id="menu-btn" />
        {/* <Route
          path="/shop"
          render={({ match }) => {
            // Do whatever you want with the match...
            return (
              <input
                onKeyPress={handleKeyPress}
                className="mt-3 mb-3 w-48 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
                type="search"
                name="search"
                autoComplete="true"
                placeholder="Search"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
            );
          }}
        /> */}

        <label className="menu-icon" for="menu-btn">
          <span className="navicon"></span>
        </label>
        {window.location.pathname === "/Shop" && (
          <div id="responsiveSearch" className=" flex flex-col  lg:ml-96 ml-24   absolute">
            <input
              onKeyPress={handleKeyPress}
              className="mt-3 mb-3 w-44 lg:w-80 md:w-60 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
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
          <li className="-py-2">
            <Link to="/Shop">Shop</Link>
          </li>
          {/* <li className="-py-2">
            <Link to="/design">Create T-Shirt</Link>
          </li> */}
          {user?.result?.username ? (
            <li className="-py-2">
              <Link to="/myProfile">{user.result.username}</Link>
            </li>
          ) : (
            <li>
              <Link to="/auth">Log In</Link>
            </li>
          )}

          {user?.result?._id ? (
            <li>
              <Link to={"/cart/" + user.result._id}>
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
            <li>
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
