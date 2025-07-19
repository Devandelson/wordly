import { useEffect, useContext } from "react";
import { MatrizActivoContextJuego, MatrizContextJuego } from '../contexts/matrizContext.jsx';


export default function Game({ condicionTeclado }) {
    const [matrizActivo, actualizarMatrizActivos] = useContext(MatrizActivoContextJuego);
    const { matriz, actualizarMatriz, eliminarLetra, saltoFila, filaActiva, cuboActivo, setCuboActivo, pulsoLetra, setPulsoLetra, primeraVez, victoria, perdida } = useContext(MatrizContextJuego);

    useEffect(() => {
        if (!condicionTeclado) {
            if (!victoria || !perdida) {
                const manejarTecla = (evento) => {
                    const esLetra = /^[a-zA-Z]$/.test(evento.key);
                    const teclasPermitidas = ['Enter', 'Backspace'];

                    if (!esLetra && !teclasPermitidas.includes(evento.key)) { } else {
                        if (primeraVez.current) {
                            primeraVez.current = false;
                            return;
                        }

                        setPulsoLetra(evento.key);
                    };
                };

                const handleKeyDown = (e) => {
                    e.preventDefault();
                    manejarTecla(e);
                };

                document.addEventListener('keydown', handleKeyDown);
                return () => document.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [matriz, filaActiva]);

    useEffect(() => {
        if (!condicionTeclado) {
            if (!victoria || !perdida) {
                if (pulsoLetra === '') return;

                // LETRA: primero coloca, luego avanza
                if (pulsoLetra !== 'Backspace' && pulsoLetra !== 'Enter') {
                    if (cuboActivo < 4) {
                        actualizarMatriz(filaActiva, cuboActivo, pulsoLetra); // escribe en el siguiente
                        setCuboActivo((prev) => Math.min(prev + 1, 3));
                    }
                }

                // BACKSPACE: primero borra, luego retrocede
                if (pulsoLetra === 'Backspace') {
                    setCuboActivo((prev) => {
                        const colActual = Math.max(prev, 0);
                        eliminarLetra(filaActiva, colActual); // elimina en el nuevo (previo)
                        const nuevo = Math.max(prev - 1, 0);
                        return nuevo;
                    });
                }
            }

            // ENTER: primero verifica la fila, luego salta.
            if (pulsoLetra === 'Enter') {
                saltoFila(actualizarMatrizActivos); // elimina en el nuevo (previo)
            }

            setPulsoLetra('');
        }
    }, [pulsoLetra]);

    return ( 
        <section className={`w-full max-w-[750px] m-auto p-2.5 bg-emerald-700 mt-6 grid grid-rows-6 gap-2.5 rounded-xl mb-2.5`}>
            {matriz.map((fila, indexFila) => (
                <FilaJuego key={indexFila} >
                    {
                        fila.map((valor, indexValor) => (
                            <ElementoJuego key={indexValor} valor={valor}
                                claseInactiva={indexFila == filaActiva ? true : false}
                                cuboActivoProp={cuboActivo == indexValor ? true : false}
                                elementoActivo={matrizActivo[indexFila][indexValor]}
                            />
                        ))
                    }
                </FilaJuego>
            ))}
        </section >
    )
}

function ElementoJuego({ valor, claseInactiva, cuboActivoProp, elementoActivo }) {
    // clase para marcar la fila, para escribir la palabra
    let claseSelect = '';

    if (elementoActivo === 1) {
        // Prioridad máxima: es correcto
        claseSelect = 'bg-amber-600 border-white';
    } else if (claseInactiva) {
        // Fila activa → puede interactuar
        claseSelect = 'bg-emerald-600 border-white hover:bg-emerald-900 hover:-translate-y-0.5 cursor-pointer active:translate-y-0.5 active:border-0';
    } else {
        // Fila inactiva y no es correcta → estilo base
        claseSelect = 'bg-emerald-300 border-white';
    }

    // clase para mostrar la posicion en la cual se esta escribiendo.
    let cuboActivo = cuboActivoProp && claseInactiva ? 'border-2' : 'border-b-2';

    return (
        <span className={`text-white aspect-square text-6xl text-center font-bold grow rounded-xl shadow-md ${cuboActivo} transition-all duration-100 ${claseSelect} relative flex  items-center justify-center box-border`}
        >
            {valor.toUpperCase()}
        </span>
    )
}

function FilaJuego({ children }) {
    return (
        <div className="w-full grid grid-cols-4 items-center gap-2.5">
            {children}
        </div>
    )
}