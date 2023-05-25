import { useContext } from 'react';
import ClimaContext from '../context/ClimaProvider';

// Custom hook que devuelve el contexto Clima
const useClima = () => {
  return useContext(ClimaContext);
};

export default useClima;
