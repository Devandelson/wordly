// funciones
import { Matrizjuego } from './contexts/matrizContext.jsx';
import { MatrizActivoJuego } from './contexts/matrizContext.jsx';
import { useState } from 'react';
// componentes
import Header from './components/header.jsx';
import Game from './components/Game.jsx';
import Inicio from './components/inicio.jsx';
import Victoria from './components/victoria.jsx';
import Perdida from './components/perdida.jsx';
import Teclado from './components/teclado.jsx';
import Categorias from './components/categorias.jsx';


function App() {
  const [vistaTeclado, setVistaTeclado] = useState(false);

  return (
    <>
      <MatrizActivoJuego>
        <Matrizjuego>
          <Header />
          <Game condicionTeclado={vistaTeclado} />
          <Teclado condicionTeclado={vistaTeclado} funcionCondicionTeclado={setVistaTeclado} />

          {/* componentes flotantes */}
          <Victoria />
          <Perdida />
        </Matrizjuego>
      </MatrizActivoJuego>

      <Categorias condicionTeclado={vistaTeclado} />
      <Inicio />
    </>
  )
}

export default App
