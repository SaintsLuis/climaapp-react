import { Formulario } from './Formulario';
import { Resultado } from './Resultado';
import { Spinner } from './Spinner';
import useClima from '../hooks/useClima';

function AppClima() {
  const { resultado, cargando, noResultado } = useClima();

  return (
    <>
      <main className='dos-columnas'>
        {/* Renderiza el formulario */}
        <Formulario />

        {cargando ? (
          // Si se está cargando el resultado, muestra el componente Spinner
          <Spinner />
        ) : resultado?.name ? (
          // Si existe un resultado con nombre, muestra el componente Resultado
          <Resultado />
        ) : noResultado ? (
          // Si no hay resultado, muestra el mensaje de noResultado
          <p>{noResultado}</p>
        ) : (
          // Si no se cumplen las condiciones anteriores, muestra el mensaje predeterminado
          <p>El clima se va a mostrar aquí</p>
        )}
      </main>
    </>
  );
}

export default AppClima;
