import { useState, useEffect, useContext } from "react";
import { MatrizActivoContextJuego, MatrizContextJuego } from '../contexts/matrizContext.jsx';

const letrasTeclado = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ENTER', [<i className="fa-solid fa-delete-left"></i>, 'Backspace'] // aqui es un array para representar el btn de eliminar
];

export default function Teclado({ condicionTeclado, funcionCondicionTeclado }) {
    // animacion del teclado
    let claseVistaTeclado = condicionTeclado == false ? '-bottom-[283px]' : 'bottom-0';
    let claseVistaLetras = condicionTeclado == false ? 'flex-col' : '';
    const [tipoTecla, setTipoTecla] = useState(true);

    function cambiarVista() {
        funcionCondicionTeclado((prev) => !prev);
    }

    // funciones del teclado
    // funciones de keydown manual para las teclas (para activar el inicio)
    function colocarLetra(letra, evento) {
        evento.preventDefault();

        if (tipoTecla) {
            const eventoKeyDown = new KeyboardEvent('keydown', {
                key: 'A',
                code: 'KeyA',
                bubbles: true
            });

            document.dispatchEvent(eventoKeyDown);
            setTipoTecla(false);
        } else {
            if (Array.isArray(letra)) {
                letra = 'Backspace';
            } else if (letra == 'ENTER') {
                letra = 'Enter';
            }

            const esLetra = /^[a-zA-Z]$/.test(letra);
            const teclasPermitidas = ['Enter', 'Backspace'];

            if (!esLetra && !teclasPermitidas.includes(letra)) { } else {
                if (primeraVez.current) {
                    primeraVez.current = false;
                    return;
                }

                setPulsoLetra(letra);
            };
        }
    }

    // ahora las funciones para manejar las pulsaciones en el juego
    const [matrizActivo, actualizarMatrizActivos] = useContext(MatrizActivoContextJuego);
    const { actualizarMatriz, eliminarLetra, saltoFila, filaActiva, cuboActivo, setCuboActivo, pulsoLetra, setPulsoLetra, primeraVez, victoria, perdida } = useContext(MatrizContextJuego);

    useEffect(() => {
        if (condicionTeclado) {
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
        <section className={`w-full max-w-[750px] fixed left-1/2 -translate-x-1/2 p-4 z-30 transition-all bg-emerald-600 rounded-tl-2xl rounded-tr-2xl ${claseVistaTeclado}`}>
            <div className={`m-auto w-max flex gap-1 items-center justify-center text-white text-2xl font-medium hover:scale-110 cursor-pointer active:scale-[0.85] transition-transform overflow-hidden ${claseVistaLetras} transition-all`} onClick={cambiarVista}>
                <p>Teclado</p>
                <i className="fa-solid fa-chevron-down"></i>
            </div>

            <div className="w-full mt-2.5 grid grid-cols-5 gap-2.5">
                {letrasTeclado.map((valor, index) => (
                    <span key={(Array.isArray(valor) ? valor[1] : index)}
                        className={`p-1.5 rounded-xs bg-white font-bold text-center min-w-full w-max ${index == 26 ? `col-span-2` : ``} hover:bg-blue-600 hover:text-white hover:scale-105 transition-all 
                        duration-100 cursor-pointer active:scale-[0.85] active:bg-blue-600
                      active:text-white`} onClick={(evento) => { colocarLetra(valor, evento) }}>
                        {
                            (Array.isArray(valor) ? (valor[0]) : valor)
                        }
                    </span>
                ))}
            </div>
        </section>
    )
}