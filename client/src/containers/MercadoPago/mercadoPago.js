import React, { useEffect, useState } from "react"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from "../Footer/footer"

let obj={bandera:true,productos:[],cantidadProductos:[],total:0}

function MercadoPago(props){
    const [productos,setProductos] = useState({productosO:[],cantidadProductos:[],total:0})
    //const [cantidadProductos,setCantidadProductos]= useState([])    
   //const [total,setTotal] = useState(0)
    const [address, setAddress] = useState(JSON.parse(localStorage.getItem('cartaddress')))
    function createCheckoutButton(preference) {
        var script = document.createElement("script");
        
        // The source domain must be completed according to the site for which you are integrating.
        // For example: for Argentina ".com.ar" or for Brazil ".com.br".
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference;
        document.getElementById("button-checkout").innerHTML = "";
        document.querySelector("#button-checkout").appendChild(script);
    }


    
    useEffect(()=>{
        if(obj.bandera){
            createCheckoutButton(props.match.params.id)
            
            obj.bandera=false

            setTimeout(function(){
                fetch(`http://localhost:3001/mercadopago/cargardatos/${props.match.params.id}`)
                .then(res=>res.json())
                .then(res=>{
                    let arrP=[]
                    let arrC=[]
                    let totalP=0
                    //alert(JSON.stringify(res.body))
                    //alert(res.body.items)
                    
                    for(let i=0;i<res.body.items.length;i++){
                        arrP.push(res.body.items[i].title)
                        arrC.push(res.body.items[i].quantity)
                        totalP+=(res.body.items[i].quantity*res.body.items[i].unit_price)
                    }
                    obj.total=totalP
                    obj.productos=arrP
                    obj.cantidadProductos=arrC
                    //setTotal(0)
                    setProductos({productosO:arrP,cantidadProductos:arrC,total:totalP})
                    //setProductos(arrP)
                    //setCantidadProductos(arrC)
                })
            },500)
            
        }
    },[])

    return(
        <div className="tracking-wide font-bold">
            <UniversalNavBar/>
            <div className="flex justify-center h-full">
                <div className="flex flex-col w-1/2 py-36">
                    <div class="flex justify-center  mb-6">
                        <p className="text-blue-500 text-3xl">Checkout Payment</p>
                    </div>
                        <p className="text-blue-500 text-1">Sending to:{address}</p>
                    <div className="flex flex-col border-t-2 border-blue-500 bg-gray-50 rounded-sm p-2">
                        <div>
                            <h2 className="text-blue-500 text-lg mb-2">Sumary</h2>
                        </div>
                        <div className="bg-gray-200" style={{width:"100%",height:"1px"}}></div>


                        {
                            productos.productosO.map((element,index)=>{
                                return (
                                    <div>
                                        <div className="flex my-2">
                                            <span>{element}</span>
                                            <div className="flex-grow"></div>
                                            <span>{productos.cantidadProductos[index]}</span>
                                        </div>
                                        <div className="bg-gray-200" style={{width:"100%",height:"1px"}}></div>
                                    </div>
                                );
                            })
                        }
                        <div className="flex">
                            <span className="text-blue-500 text-lg">TOTAL</span>
                            <div className="flex-grow"></div>
                            <span>{productos.total}</span>
                        </div>


                        <div className="flex justify-center pt-2 bg-color-white">
                            <div id="button-checkout">
                            </div>
                        </div>

                    </div>

                </div> 
            </div>
            <Footer/>
        </div>
    );
}

export default MercadoPago;