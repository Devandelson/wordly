import { MatrizContextJuego } from '../contexts/matrizContext.jsx';
import { useContext } from 'react';

export default function Header() {
  const { titleData } = useContext(MatrizContextJuego);

  return (
    <>
      <header className="w-full flex items-center gap-3 justify-center text-center text-white">
        <i className="fa-solid fa-star fa-spin text-amber-500 text-6xl"></i>

        <section>
          <h1 className="text-5xl font-bold text-center mt-7">
            Wordly
          </h1>
          <p className="text-center text-2xl">Juego de palabras</p>

          <h3 className="text-center font-bold text-4xl mt-7">Categoria: {titleData.toUpperCase()} </h3>
        </section>

        <i className="fa-solid fa-star fa-spin text-amber-500 text-6xl"></i>
      </header>

      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none text-[20px] w-max block mx-auto mt-6 dark:focus:ring-blue-800' onClick={() => { localStorage.clear(); location.reload(); }}>
        Reiniciar
      </button>
    </>
  )
}