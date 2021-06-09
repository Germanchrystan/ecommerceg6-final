import React, { useEffect, useState } from "react"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from "../Footer/footer"
import { connect } from "react-redux"
const { REACT_APP_API } = process.env;


function mapStateToProps(state) {
    return { carritos: state.cartReducer.cartsList }
}


function CarroDetallado(props) {
    // const [carrito, setCarrito] = useState({})

    // useEffect(async () => {

    //     //await props.getCartsUser(props.match.params.userId)

    //     //props.carritos.carts.filter(element=>element._id==props.match.params.idCarro).map(arr=>setCarrito(arr[0]))

    //     fetch(`${REACT_APP_API}carts/${props.match.params.userId}`)
    //         .then(res => res.json())
    //         .then(res => {
    //             let bandera = 0;
    //             for (let i = 0; i < res.carts.length; i++) {
    //                 if (res.carts[i]._id == props.match.params.idCarro) {
    //                     bandera = i;
    //                     break;
    //                 }
    //             }
    //             setCarrito(res.carts[bandera])
    //         })
            
    // }, [])
    // console.log("PEPEPEPEPE",carrito)
    return (
        <div className="bg-gray-200">

        </div>
    );
}

export default CarroDetallado

//export default connect(mapStateToProps,{getCartsUser})(CarroDetallado)
/*

carrito.items.map(element=>{
                            return(
                                <div className="flex w-full justify-around">
                                    <span>{element.name}</span>
                                    <span>{element.quantity}</span>
                                    <span>{element.price}</span>
                                </div>
                            );
                        })


*/
/*





                <div className="flex flex-col h-screen">
                    <div className="flex w-full justify-around mt-6">
                        <span className="text-3xl font-bold text-blue-500">Producto</span>
                        <span className="text-3xl font-bold text-blue-500">Cantidad</span>
                        <span className="text-3xl font-bold text-blue-500">Precio Unitario</span>
                    </div>
                    {
                        carrito.hasOwnProperty("items")?
                        carrito.items.map(element=>{
                         return(
                            <div className="flex w-full justify-around my-2">
                                <span className="text-3xl font-bold text-blue-500">{element.name}</span>
                                <span className="text-3xl font-bold text-blue-500">{element.quantity}</span>
                                <span className="text-3xl font-bold text-blue-500">{element.price}</span>
                            </div>
                             );
                         }):
                      <div></div>
                    }
                    <div className="w-full h-full"></div>
                    <div className="bg-gray-300" style={{height:"1px"}}></div>
                    {
                        carrito.hasOwnProperty("items")?
                        <div className="flex w-full justify-around mb-6">
                                <span className="text-3xl font-bold text-blue-500">TOTAL</span>

                                <span className="text-3xl font-bold text-blue-500">{carrito.totalAmount}</span>
                        </div>:
                      <div></div>
                    }
                </div>




*/
