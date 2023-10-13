import PropTypes from "prop-types";
import { useAPI } from "./useAPI";
import { useEffect, useState } from "react";

/**
 * @module useSearch
 * @description Se busca que este hook se encargue de funciones de búsqueda y filtrado de parámetros,
 * según sea necesario
 */

function useSearch() {
  /*--------------------------------------------------------------------------------------------------------------------------------------------*/

  /**
   * @function: Esta función filtra algún arreglo proporcionado por un estado de React, en donde este se filtrará
   * y actualizará en base al parámetro de filtrado.
   * @param {string | number | Object} filterParam
   * @param {Array | any} state
   * @param {func} setState
   */

  const handleFilter = (filterParam, state, setState) => {
    if (state.includes(filterParam)) {
      setState(state.filter((heading) => heading !== filterParam));
    } else {
      setState([...state, filterParam]);
    }
  };

  handleFilter.propTypes = {
    filterParam:
      PropTypes.string || PropTypes.number || PropTypes.instanceOf(Object),
    state: PropTypes.array,
    setState: PropTypes.func,
  };

  /*--------------------------------------------------------------------------------------------------------------------------------------------*/

  const { fetchAPI, error, loading, result } = useAPI();
  const [searchResults, setSearchResults] = useState([]);
  const [searchParam, setSearchParam] = useState();

  // Efecto que despliega un error en caso de obtenerlo
  useEffect(() => {
    if (error) {
      console.error(
        `Error searching ${searchParam} :`,
        error.status,
        error.message
      );
    }
  }, [error, searchParam]);

  // Efecto que obtiene los datos de los resultados y los guarda
  useEffect(() => {
    if (result) setSearchResults(result);
  }, [result]);

  /**
   * @function searchByAPI: Obtiene los resultados de búsqueda bajo el parámetro especificado
   * por medio de la API.
   * @param {string | number} search: Parámetro de búsqueda. 
   */
  const searchByAPI = async (search) => {
    setSearchParam(search);
    await fetchAPI({
      method: "GET",
      route: `search?text=${search}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  /*--------------------------------------------------------------------------------------------------------------------------------------------*/
  return { handleFilter, searchByAPI, searchResults, searching: loading, errorSearching: error };
}

export { useSearch };
