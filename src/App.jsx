import AppClima from './components/AppClima';
import { ClimaProvider } from './context/ClimaProvider';

function App() {
  return (
    <>
      {/* Se envuelve la aplicación con el proveedor del contexto Clima */}
      <ClimaProvider>
        <header>
          <h1>Buscador de Clima</h1>
        </header>
        {/* Se renderiza el componente principal de la aplicación */}
        <AppClima />
      </ClimaProvider>
    </>
  );
}

export default App;
