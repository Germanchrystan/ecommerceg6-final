import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import remera from "./background_tshirt.png"
import "./tshirtFeature.css"
import batman from "./batman.png"
import { SwatchesPicker } from 'react-color';
import UniversalNavBar from '../UniversalNavBar/universalNavBar';
import Footer from '../../containers/Footer/footer';
import domtoimage from 'dom-to-image';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../../redux/actions/products_actions';
import { addItem, addToCart } from '../../redux/actions/cart_actions';
import swal from 'sweetalert';


const TshirtFeature = () => {
    const [canvas, setCanvas] = useState('');
    const [imgURL, setImgURL] = useState('')
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const productsArray = useSelector(
        (state) => state.productsReducer.addProduct?.product
    );
    const [post, setPost] = useState(false);

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 435,
            width: 360,
        })
    );

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);
    console.log(canvas)
    const addImg = (e, url, canvi) => {
        e.preventDefault();
        new fabric.Image.fromURL(url, img => {
            // console.log("AAAAA", img)
            img.scale(0.75);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        }, {
            crossOrigin: "Annoymous"
        });;
    }

    const addRect = canvi => {
        const rect = new fabric.Rect({
            height: 50,
            width: 50,
            fill: 'yellow'
        });
        canvi.add(rect);
        canvi.renderAll();
    }

    function b64toBlob(dataURI) {

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    const download = () => {
        var node = document.getElementById('tshirt-div');

        domtoimage.toPng(node).then(function (dataUrl) {
            // Print the data URL of the picture in the Console
            // console.log(dataUrl);
            // You can for example to test, add the image at the end of the document
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = dataUrl;
            //document.body.appendChild(img);
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.crossOrigin = 'Anonymous'
            link.href = dataUrl;

            //link.click()
            var blob = b64toBlob(dataUrl)
            setProduct({ ...product, image: blob })
            setPost(true);
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }


    /**
 * Método que define una imagen como imagen de fondo del lienzo.
 * 
 * @param {String} imageUrl      La URL del servidor de la imagen que desea cargar en la camiseta.
 *
 * @return {void} Descripción del valor de retorno.
 */
    function updateTshirtImage(imageURL) {
        // Si el usuario no elige una opción de la selección, borre el lienzo
        if (!imageURL) {
            canvas.clear();
        }

        // Cree una nueva imagen que se pueda usar en Fabric con la URL
        fabric.Image.fromURL(imageURL, function (img) {
            // Definir la imagen como imagen de fondo del lienzo
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                // Escala la imagen al tamaño del lienzo
                height: 100,
                width: 50,
            });
        });
    }

    const [shirtColor, setShirtColor] = useState()

    const handleChangeComplete = (e) => {
        setShirtColor(e.hex);

    };

    const addImgUpload = (e, url, canvi) => {
        e.preventDefault();
        //var fileType = e.target.files[0].type;
        var url = URL.createObjectURL(e.target.files[0]);
        new fabric.Image.fromURL(url, img => {
            console.log("AAAAA", url)
            img.scale(0.75);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        }, {
            crossOrigin: "Annoymous"
        });;
    }

    const color = (e) => {
        // 1. Cuando cambia el color de la camiseta:
        // Actualiza el color de la camiseta según el color seleccionado por el usuario

        document.getElementById("tshirt-div").style.backgroundColor = e;

        // // 2. Cuando el usuario elige un diseño:
        // // Actualiza la imagen de fondo de la camiseta según la imagen seleccionada por el usuario
        // document.getElementById("tshirt-design").addEventListener("change", function () {

        //     // Llamar al método updateTshirtImage proporcionando como primer argumento la URL
        //     // de la imagen proporcionada por la selección
        //     updateTshirtImage(e);
        // }, false);
    }

    const clear = () => {
        canvas.clear()
    }

    const [product, setProduct] = useState({
        productName: "",
        sizeName: "XS",
        quantity: [],
        colorName: "custom",
        image: "",
        price: 1000,
        categories: ["60b6c6bce1db94362c42bbaf"],
        brand: "Custom",
        custom: "true",
        productId: ""
    })
    const postTshirt = () => {
        if (user) {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            // let extension = product.name.split(".");
            const newProduct = new FormData()
            newProduct.append("name", product.productName)
            newProduct.append("color", product.colorName)
            newProduct.append("stock", product.quantity)
            newProduct.append("size", [product.sizeName])
            newProduct.append("price", product.price)
            newProduct.append("brand", product.brand)
            newProduct.append("img", product.image)
            newProduct.append("categories", product.categories)
            newProduct.append("custom", product.custom)
            newProduct.append("userId", user?.result?._id)
            dispatch(addProducts(newProduct, config))

        }
        else {
            alert("log in")
            window.location.replace("/auth")
        }
    }
    // const postDownload = () =>{
    //     download()
    // }
    const [addCart, setAddCart] = useState(false)
    useEffect(() => {
        if (post) {
            postTshirt();
            swal({
                title: "Successfully Added to your Catalog ",
                text: 'Nice T-Shirt!',
                icon: "success"
            })
        }
        if (addCart) {
            dispatch(addItem(product, user?.result?._id))
            swal({
                title: "Custom T-Shirt Added to the Cart",
                text: 'Well done!',
                icon: "success"
            })
        }
    }, [post, addCart])

    const addToCart = () => {
        setProduct({ ...product, productId: productsArray._id })
        setPost(false)
        setAddCart(true);
    }
    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />

            <section id="section" class="mt-10 lg:pl-44 -mb-10 text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-24 mx-auto">
                    <div class=" mx-auto flex flex-wrap">
                        <div id='tshirt-div'>
                            {/* <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg" /> */}
                            <img id="tshirt-backgroundpicture" crossOrigin="anonymous" src={remera} />

                            <div id="drawingArea" class="drawing-area">
                                <div class="canvas-container">
                                    <canvas id="canvas"></canvas>
                                </div>
                            </div>
                        </div>

                        <div id="gridTshirt" class="grid lg:grid-cols-2 grid-cols-1 gap-32 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-16 lg:mt-0">
                            <div>
                                <label className="text-xl title-font text-gray-500 tracking-widest" for="name">T-Shirt Name</label>
                                <input id="name" onChange={(e) => setProduct({ ...product, productName: e.target.value })} className=" flex items-center text-lg title-font text-gray-500 tracking-widest border-2 mb-2 rounded border-blue-600" />
                                {/* <h2 class="text-lg title-font text-gray-500 tracking-widest">Design Your Own T-Shirt</h2> */}
                                <h1 class="text-gray-500 text-2xl title-font font-bold mb-1">Choose Shirt Color:</h1>
                                <div id="tshirt-color" class="flex mb-4" className="colors">
                                    <span class="flex items-center">
                                        <SwatchesPicker
                                            color={shirtColor}
                                            onChangeComplete={(a) => color(a.hex)}
                                        />
                                    </span>
                                </div>
                                <label className="text-xl title-font text-gray-500 tracking-widest" for="name">T-Shirt Size:</label>

                                <select onChange={(e) => setProduct({ ...product, sizeName: e.target.value })} className="flex border-2 py-1 px-2 rounded mb-2 border-blue-600">
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>XXL</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xl title-font text-gray-500 tracking-widest" for="name">Quantity:</label>
                                <input onChange={(e) => setProduct({ ...product, quantity: e.target.value })} id="name" type="number" className=" flex items-center text-lg title-font text-gray-500 tracking-widest border-2 mb-2 rounded border-blue-600" />
                                <div class="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5">

                                    <div class="flex ml-6 items-center">
                                    </div>
                                </div>
                                {/*  */}
                                <div>
                                    <h2 class="text-xl title-font text-gray-500 text-bold tracking-widest">Upload Image from PC:</h2>
                                    <input type="file" onChange={(e, url) => addImgUpload(e, url, canvas)}></input>
                                </div>
                                <h2 class="text-xl title-font pl-20 my-4  text-gray-500 text-bold tracking-widest">OR</h2>
                                {/*  */}
                                <div class="flex">
                                    <form onSubmit={e => addImg(e, imgURL, canvas)}>
                                        <div className="">
                                            <h2 class="text-xl title-font text-gray-500 text-bold tracking-widest">Upload Image from URL:</h2>
                                            <input className="border-2 rounded border-blue-600 w-full"
                                                type="text"
                                                value={imgURL}
                                                onChange={e => setImgURL(e.target.value)}
                                            />
                                            <div className="flex gap-5">
                                                <button type="submit" class="flex text-white bg-indigo-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type="submit">Add Image</button>
                                                <button onClick={clear} class="flex text-white bg-red-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                                                </button>
                                            </div>
                                            <button type="button" onClick={() => download()} class="grid grid-cols-1 text-white bg-green-500 border-0 w-full mt-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" type="submit">Save T-shirt</button>
                                            {post &&
                                                <button type="button" onClick={() => addToCart()} class="grid grid-cols-1 text-white bg-green-500 border-0 w-full mt-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" type="submit">Add To Cart</button>}
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default TshirtFeature