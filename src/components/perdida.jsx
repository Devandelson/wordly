import fPerdida from '../assets/perdida.jpg';
import { useContext } from 'react';
import { MatrizContextJuego } from '../contexts/matrizContext.jsx';

export default function Victoria() {
    const { perdida } = useContext(MatrizContextJuego);

    return (
        perdida && (
            <section className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 animate-jelly'>
                <img src={fPerdida} alt="fondo de perdida" className='absolute w-full -z-10 h-full top-0 left-0' />

                <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold p-3.5 border-b-4 border-blue-700 hover:border-blue-500 rounded active:border-0 active:bg-blue-950 cursor-pointer z-20 text-2xl" 
                    onClick={() => {location.reload(); localStorage.clear()}}
                >
                    Jugar de nuevo
                </button>
            </section>
        )
    );
}