import React from "react";
import { Link } from "react-router-dom";

export default function GridHome(props) {
    return (
        <div className="flex justify-center my-4 p">
            <div className="grid inline-grid sm:grid-cols-3 grid-cols-1 gap-4 p-4 border-2 border-gray-100">
                {props.cards.map(card => {
                    return (
                        <div>
                            <div className="flex justify-center">
                                <img alt="Product" style={{ height: "300px", width: "250px" }} src={card.url} />
                            </div>
                            <div className="relative flex justify-center">
                                <Link className="relative flex justify-center" to="/">
                                    <button className="text-lg font-bold absolute bottom-5 rounded-md border-2 border-green-500 bg-white bg-opacity-30 px-2 text-green-500 hover:bg-green-500 hover:text-white">{card.name}</button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
/*          <p className="text-lg font-bold absolute bottom-20 text-white">{card.name}</p>

            <div>
                <div className="flex justify-center">
                    <img style={{height:"250px",width:"250px"}} src={props.remera}/>
                </div>
                <div className="relative flex justify-center">
                    <p className="">Men</p>
                    <button className="text-lg font-bold absolute bottom-5 rounded-md border-2 border-green-500 bg-white bg-opacity-10 px-2 text-green-500">Entrar</button>
                </div>
            </div>

            <div>
                <div className="flex justify-center">
                    <img style={{height:"250px",width:"250px"}} src={props.pantalon}/>
                </div>
                <div className="relative flex justify-center">
                    <p className="">Men</p>
                    <button className="text-lg font-bold absolute bottom-5 rounded-md border-2 border-green-500 bg-white bg-opacity-10 px-2 text-green-500">Entrar</button>
                </div>
            </div>

            <div>
                <div className="flex justify-center">
                    <img style={{height:"250px",width:"250px"}}  src={props.campera}/>
                </div>
                <div className="relative flex justify-center">
                    <p className="">Men</p>
                    <button className="text-lg font-bold absolute bottom-5 rounded-md border-2 border-green-500 bg-white bg-opacity-10 px-2 text-green-500">Entrar</button>
                </div>
            </div>
*/