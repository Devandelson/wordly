import { createContext, useState, useRef, Suspense } from "react";
import Swal from 'sweetalert2'
import { fechingData } from "../apiPalabras.js";

const findData = fechingData('wordly/palabras.json');

// matriz del letras correctas
export const MatrizActivoContextJuego = createContext(null);

export const MatrizActivoJuego = ({ children }) => {
    const matrizActivosDefault = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    const [matrizActivo, setMatrizActivo] = useState(matrizActivosDefault);

    function actualizarMatrizActivos(fila, posicionesActivos) {
        setMatrizActivo((prev) => {
            const copyPrev = prev;
            // colocando las letras correctas, segun su fila y col.
            posicionesActivos.map((valorActivo) => {
                copyPrev[fila][valorActivo] = 1;
            })
            return copyPrev;
        })
    }

    return (
        <MatrizActivoContextJuego.Provider value={[matrizActivo, actualizarMatrizActivos]}>
            {children}
        </MatrizActivoContextJuego.Provider>
    );
}

// matriz juego
export const MatrizContextJuego = createContext(null);

export const Matrizjuego = ({ children }) => {
    const arrayResultData = findData.read();
    const resultData = arrayResultData[0];

    // Seleccionando la palabra a adivinar
    let wordsData = resultData.palabras;
    if (!localStorage.getItem('palabra')) {
        localStorage.setItem('palabra', wordsData[Math.floor(Math.random() * wordsData.length)]);
    }
    let palabraSeleccionada = localStorage.getItem('palabra');

    // Titulo
    if (!localStorage.getItem('titulo')) {
        localStorage.setItem('titulo', resultData.key);
    }

    let titleData = localStorage.getItem('titulo');

    const matrizJuegoDefault = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ]

    const [matriz, setMatriz] = useState(matrizJuegoDefault);
    const [filaActiva, setFilaActiva] = useState(0); // fila activa
    const [cuboActivo, setCuboActivo] = useState(0);
    const [pulsoLetra, setPulsoLetra] = useState('');
    const primeraVez = useRef(true);
    const [victoria, setVictoria] = useState(false);
    const [perdida, setPerdida] = useState(false);

    function actualizarMatriz(fila, col, valor) {
        setMatriz((prev) => {
            let matrizCopia = prev;
            matrizCopia[fila][col] = valor;

            return matrizCopia;
        });
    }

    function eliminarLetra(fila, col) {
        setMatriz((prev) => {
            let matrizCopia = [...prev];
            matrizCopia[fila][col] = '';

            return matrizCopia;
        });
    }

    function saltoFila(actualizarMatrizActivos) {
        let verificacionCasillas = true;
        // verificando que todas las casillas esten completas
        matriz[filaActiva].map((valor) => {
            if (valor == '') {
                Swal.fire({
                    title: 'Error!',
                    text: 'Escribe todo completo coño',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                verificacionCasillas = false;
                return;
            }
        })

        if (verificacionCasillas) {
            // verificando cada letra
            let palabraSeleccionadaArray = palabraSeleccionada.split('');
            let arrayLetrasActivas = []; // capturando las letras activas.
            matriz[filaActiva].map(((valor, index) => {
                if (valor.toUpperCase().trim() == palabraSeleccionadaArray[index].toUpperCase().trim()) {
                    arrayLetrasActivas.push(index);
                }
            }));

            // ahora actualizando la matriz de letras buenas.
            if (arrayLetrasActivas.length > 0) {
                actualizarMatrizActivos(filaActiva, arrayLetrasActivas);
            }

            // condicion de que gano
            if (arrayLetrasActivas.length == 4) {
                // estableciendo la victoria
                setVictoria(true);
            } else {
                // verificando la cantidad maxima de filas, para la condicion de perdida.
                let numFilaMaxima = 6;
                let filaFutura = filaActiva + 1;
                if (filaFutura == numFilaMaxima) {
                    setPerdida(true);
                } else {
                    setFilaActiva((prev) => prev + 1);
                    setCuboActivo(0);
                }
            }
        }
    }

    return (
        <Suspense fallback={<p>Esperando.... Reinicia</p>}>
            <MatrizContextJuego.Provider value={
                { matriz, actualizarMatriz, eliminarLetra, saltoFila, filaActiva, cuboActivo, setCuboActivo, pulsoLetra, setPulsoLetra, primeraVez, victoria, perdida, titleData }
            }>
                {children}
            </MatrizContextJuego.Provider>
        </Suspense>
    );
}
