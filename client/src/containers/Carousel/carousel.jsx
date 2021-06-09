import React from "react";
import { Link } from 'react-router-dom';
import zapatillas from '../../assets/zapatillas.jpg'
import nike from '../../assets/nike.jpg'
import nike2 from '../../assets/nike2.jpg'
import helly from '../../assets/helly.jpg'
import "./carousel.css"

export default function Carousel(props) {
  return (
    <div className="slider pt-20">
      <ul>
        <Link style={{ width: "100%" }} to={props.productos[0].id}>
          <li>
            <img style={{ width: "100%", height: "600px" }} src={zapatillas} alt="" />
          </li>
        </Link>
        <Link style={{ width: "100%" }} to={props.productos[1].id}>
          <li>
            <img style={{ width: "200%", height: "600px" }} src={nike} alt="" />
          </li>
        </Link>
        <Link style={{ width: "100%" }} to={props.productos[2].id}>
          <li>
            <img style={{ width: "100%", height: "600px" }} src={nike2} alt="" />
          </li>
        </Link>
        <Link style={{ width: "100%" }} to={props.productos[3].id}>
          <li>
            <img style={{ width: "400%", height: "600px" }} src={helly} alt="" />
          </li>
        </Link>
      </ul>
    </div>
  );
}