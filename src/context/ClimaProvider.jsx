/* eslint-disable react/prop-types */
import { useState, createContext } from 'react';
import axios from 'axios';

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  // Estado para almacenar los datos de búsqueda de la ciudad y país
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  // Estado para almacenar el resultado de la consulta del clima
  const [resultado, setResultado] = useState({});

  // Estado para controlar la carga de la consulta
  const [cargando, setCargando] = useState(false);

  // Estado para manejar los casos en los que no se obtiene un resultado
  const [noResultado, setNoResultado] = useState(false);

  // Función para actualizar los datos de búsqueda
  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Función para realizar la consulta del clima
  const consultarClima = async datos => {
    setCargando(true);
    setNoResultado(false);
    try {
      const { ciudad, pais } = datos;
      const appId = import.meta.env.VITE_API_KEY;

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

      // Consulta la API de OpenWeatherMap para obtener las coordenadas de la ciudad
      const { data } = await axios(url);
      const { lat, lon } = data[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Consulta la API de OpenWeatherMap para obtener el clima de la ciudad
      const { data: dataClima } = await axios(urlClima);
      setResultado(dataClima);
    } catch (error) {
      setNoResultado('No se encontraron resultados');
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* Proveedor del contexto Clima */}
      <ClimaContext.Provider
        // Valores que se van a compartir en el contexto
        value={{
          busqueda,
          datosBusqueda,
          consultarClima,
          resultado,
          cargando,
          noResultado,
        }}
      >
        {children}
      </ClimaContext.Provider>
    </>
  );
};

export { ClimaProvider };
export default ClimaContext;
