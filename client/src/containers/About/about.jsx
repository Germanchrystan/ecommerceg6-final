import React from "react"
import Footer from "../Footer/footer"
import ImagenAbout from "../../assets/aboutus.png"
import ImagenJuli from "../../assets/Juli.jpeg"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"

export default function About() {
    function redirigir(direccion) {
        window.location.href = direccion;
        return;
    }
    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <div className="flex justify-center pt-20">
                <div className="flex flex-col">
                    <div className="flex justify-center my-10">
                        <div className="flex flex-col justify-center align-center content-center">
                            <div className="flex justify-center">
                                <img className="w-80" src={ImagenAbout} />
                            </div>
                            <p className="px-20 py-10 text-justify">We are constantly striving to improve our business by introducing new products, improving our staff and constantly expanding our range. Our main target market is the Australian consumer, but we constantly source overseas customers as well. Our vision is to become a global fashion brand that will appeal to every fashion lover around the world. </p>
                        </div>
                    </div>
                    <div className="flex justify-center mx-20">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://avatars.githubusercontent.com/u/72827720?s=400&u=10888907d037408c5f5c87983bb8c1d3fb1de302&v=4" alt="not found" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Diego: Soy Full Stack developer con orientación al Back-end. Soy apasionado por la tecnología siempre con ganas de aprender y mejorar.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-black-500 border-green-500 border-2 hover:bg-green-500" onClick={e => redirigir("https://github.com/Diego121520")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src={ImagenJuli} />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Juliana Gonzalez:</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-black-500 border-green-500 border-2 hover:bg-green-500" onClick={e => redirigir("https://github.com/julianactrl")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://avatars.githubusercontent.com/u/56849875?v=4" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">German Chrystan: Soy desarrollador web y músico, terminando la carrera de Composición en la Universidad Nacional de las Artes. He trabajado mayormente como docente de música, compositor para obras de teatro, productor musical y gestionando la agenda cultural del Multiespacio María Fux. Empecé a estudiar programación con el fin de relacionarlo con el sonido y la composición. Con la llegada de la nueva normalidad, este interés se transformó en una profesión que me apasiona y me motiva continuamente.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-black-500 border-green-500 border-2 hover:bg-green-500" onClick={e => redirigir("https://github.com/Germanchrystan")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://avatars.githubusercontent.com/u/75331914?s=400&u=9e420c9d5c734ca8f88440ce580d2a8e9765a372&v=4" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Francisco: Soy un Desarrolador Web Full Stack con residencia en Argentina. Actualmente estoy buscando oportunidades laborales en mi campo y estoy dispuesto a aprender nuevas tecnologias.
                                Me gusta trabajar en grupo, resolver problemas y aprender algo nuevo todos los dias.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-black-500 border-green-500 border-2 hover:bg-green-500" onClick={e => redirigir("https://github.com/FranG14")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://avatars.githubusercontent.com/u/67129080?v=4" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Juan Agustin Reynaud: Tengo 23 años , vivo en Mendoza Argentina ,soy desarrollador web full stack ,me encanta la tecnología y la innovación , y desarrollar apps para darle un aporte a la sociedad.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-black-500 border-green-500 border-2 hover:bg-green-500" onClick={e => redirigir("https://github.com/AgustinReynaud")}>Github</button>

                        </div>
                    </div>
                    
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQ0gUFiWvt2SqU6kufMvSTPOYgYHS3ua0oivfLbJ1UCMcc9xZNqBWpD4TZW8AZc340Ug&usqp=CAU" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Jonathan </p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-black-500 border-green-500 border-2 hover:bg-green-500" onClick={e => redirigir("https://github.com/nohaynicksdisponibles")}>Github</button>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}