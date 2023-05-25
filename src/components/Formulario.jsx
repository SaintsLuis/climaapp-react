import { useState } from 'react';
import useClima from '../hooks/useClima';

export const Formulario = () => {
  const [alerta, setAlerta] = useState(false);

  // Obtener los datos y funciones del contexto Clima utilizando el hook personalizado useClima
  const { busqueda, datosBusqueda, consultarClima } = useClima();

  const { ciudad, pais } = busqueda;

  const handleSubmit = e => {
    e.preventDefault();

    // Validar que se haya ingresado ciudad y país
    if (Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios');
      return;
    }
    setAlerta(false);
    consultarClima(busqueda);
  };

  return (
    <>
      <div className='contenedor'>
        {alerta && <p className='error'>{alerta}</p>}

        <form onSubmit={handleSubmit}>
          <div className='campo'>
            <label htmlFor='ciudad'>Ciudad</label>
            <input
              type='text'
              id='ciudad'
              name='ciudad'
              onChange={datosBusqueda}
              value={ciudad}
            />
          </div>

          <div className='campo'>
            <label htmlFor='pais'>País</label>
            <select name='pais' id='pais' onChange={datosBusqueda} value={pais}>
              <option value=''>Seleccione un País</option>
              <option value='US'>Estados Unidos</option>
              <option value='DO'>República Dominicana</option>
              <option value='MX'>México</option>
              <option value='AR'>Argentina</option>
              <option value='CO'>Colombia</option>
              <option value='CR'>Costa Rica</option>
              <option value='ES'>España</option>
            </select>
          </div>

          <input type='submit' value='Consultar Clima' />
        </form>
      </div>
    </>
  );
};
