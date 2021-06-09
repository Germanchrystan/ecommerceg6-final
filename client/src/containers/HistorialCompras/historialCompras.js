import React, { useEffect, useState } from "react"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from "../Footer/footer"
import { useDispatch, useSelector } from "react-redux"
import { getCartsByUser } from "../../redux/api"
import { Link } from "react-router-dom"



function HistorialCompras(props) {
    const [carritos, setCarritos] = useState([])
    const [idCarro, setIdCarro] = useState(0)
    const [idDeUsuario, setIdDeUsuario] = useState(props.match.params.userId)

    async function touch(elemento) {
        //alert(elemento)
        await setIdCarro(elemento)
        document.getElementById("redirectCarro").click()
    }

    function parseDate(input) {
        console.log("ENTRA AL PARSE INT", input)
        var parts = input.match(/(\d+)/g);
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }
    console.log(carritos)
    useEffect(() => {
        getCartsByUser(props.match.params.userId)
            .then(result => result.data)
            .then(res => {
                let carts = []
                for (let i = 0; i < res?.carts.length; i++) {
                    if (res.carts[i].state == "Paid") {
                        carts.push(res.carts[i])
                    }
                    if (res.carts[i].state == "On it's Way") {
                        carts.push(res.carts[i])
                    }
                    if (res.carts[i].state == "Delivered") {
                        carts.push(res.carts[i])
                    }
                    if (res.carts[i].state == "Cancelled") {
                        carts.push(res.carts[i])
                    }
                }
                carts.sort((a, b) => {
                    if (parseDate(a.fechaCierre).getTime() > parseDate(b.fechaCierre).getTime()) {
                        return 1;
                    }
                    if (parseDate(a.fechaCierre).getTime() < parseDate(b.fechaCierre).getTime()) {
                        return -1;
                    }
                    return 0;
                })
                setCarritos(carts)
            })
    }, [])

    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <div className="mt-20 pt-4 mb-4 flex justify-center">

            </div >

            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Date of Order</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">State</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carritos.map((c, id) => {
                            return <tr key={id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    {c.fechaCierre && c.fechaCierre.split(".")[0].split("T")[0] + " / " + c.fechaCierre.split(".")[0].split("T")[1]}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    {c.items.length > 0 && c.items.map(p => {
                                        return <p ><Link className="hover:text-blue-500" to={`/product/${p.productId}`}>{p.name} {p.colorName} {p.sizeName}</Link></p>
                                    })}
                                </td>

                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    ${c.totalAmount}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    {c.state}
                                </td>
                            </tr>
                        })}



                </tbody>
            </table>
            <br></br>
            <div className="flex justify-center mb-4">


            </div>
            <Footer />
        </div >
    );
}

export default HistorialCompras
