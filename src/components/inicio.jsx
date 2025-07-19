// import { useEffect } from "react";
import manoAbajo from '../assets/manoAbajo.png';
import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react"

export default function Inicio() {
    const [activo, setActivo] = useState(true);

    window.addEventListener('keydown', () => {
        setActivo(false);
    });

    return (
        <AnimatePresence>
            {activo && (
                <motion.section className="fixed w-full h-full top-0 left-0 bg-emerald-700 flex items-center justify-center flex-col"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <img src={manoAbajo} alt="Mano abajo" className='w-[30vw] aspect-1/1 object-cover animate-bouncing' />
                    <p className="text-[clamp(1.5rem,7vw,10rem)] text-center text-white font-bold">Presiona una tecla</p>
                </motion.section>
            )}
        </AnimatePresence>
    );
}