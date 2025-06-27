import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { fechingData } from '../apiPalabras.js';

const findData = fechingData('palabras.json');

export default function Categorias({ condicionTeclado }) {
    let claseTecladoMargen = condicionTeclado ? 'mb-96' : 'mb-20'; // margen automatico para cuando se active el teclado.

    // informacion
    const arrayResultData = findData.read();
    const resultData = arrayResultData[1];
    let titles = Object.keys(resultData)

    // obteniendo un array de palabras de cada titulo
    let arrayConjuntoPalabras = [];

    titles.map((valorConjunto, indexConjunto) => {
        arrayConjuntoPalabras.push(resultData[valorConjunto].palabras);
    })

    // realizando evento para cambiar entre conjuntos (Es un tab)
    const [conjuntoActivo, setConjuntoActivo] = useState(0);

    function cambiarFocoConjunto(indice) {
        setConjuntoActivo(indice);
    }

    return (
        <section className={`${claseTecladoMargen} max-w-[750px] m-auto mt-15`}>
            <h3 className="text-yellow-600 text-4xl font-bold"><i className="fa-solid fa-icons"></i> Palabras del juego:</h3>

            <div className="flex flex-wrap -mb-px text-sm font-medium mt-5">
                {titles.map((value, index) => (
                    <ItemEncabezado key={index} titulo={value} claseIcono={resultData[value].icon} active={conjuntoActivo == index ? true : false} onClick={() => { cambiarFocoConjunto(index) }} />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <div className="flex items-center justify-start flex-wrap gap-5 text-white mt-3.5 bg-orange-900 rounded-lg p-3.5 font-medium text-[18px]" key={conjuntoActivo}>       
                        {arrayConjuntoPalabras[conjuntoActivo].map((valorConjunto, index) => (
                            <motion.p key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {`"${valorConjunto}" `}
                            </motion.p>
                        ))}    
                </div>
             </AnimatePresence>
        </section>
    );
}

// componentes
function ItemEncabezado({ titulo, claseIcono, active = false, ...evento }) {
    let claseActive = active ? 'text-blue-300 border-blue-300' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300';

    return (
        <li className={`${claseActive} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group gap-2 text-[20px] hover:scale-110 transition-all cursor-pointer active:scale-[0.85]`} {...evento}
        >
            <i className={`${claseIcono}`}></i>
            {titulo}
        </li>
    );
}