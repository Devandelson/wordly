import img1 from '../assets/dora1.webp';
import img2 from '../assets/dora2.jpg';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { MatrizContextJuego } from '../contexts/matrizContext.jsx';

export default function Victoria() {
    const { victoria } = useContext(MatrizContextJuego);

    return (
        victoria && (
            <motion.section className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 flex-col gap-3.5'
                animate={{ top: ['100%', '67%', '67%', '0%'] }}
                transition={{
                    duration: 4,
                    ease: 'easeInOut'
                }}
            >
                <div className="w-full h-full border-2 absolute top-0 left-0 bg-gray-900 overflow-hidden">
                    <img src={img1} alt="Fondo dora amable" className='w-full h-1/3 object-contain' />
                    <img src={img2} alt="Fondo dora con pistola" className='w-full h-2/3 object-cover' />
                </div>

                <h3 className='font-bold text-[clamp(1.5rem,7vw,10rem)] text-center text-emerald-700 text-shadow-lg/60  z-20'>Con el Alma en un Hilo: <br /> ¡Una Victoria Emocionante!</h3>

                <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold p-3.5 border-b-4 border-blue-700 hover:border-blue-500 rounded active:border-0 active:bg-blue-950 cursor-pointer z-20 text-2xl" 
                    onClick={() => {location.reload(); localStorage.clear()}}
                >
                    Jugar de nuevo
                </button>
            </motion.section>
        )
    );
}