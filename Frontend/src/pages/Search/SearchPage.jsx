import { useEffect } from "react";
import styles from "./SearchPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { TbMap2, TbLayoutList, TbAlarm } from "react-icons/tb";
import { useState } from "react";
import SearchResultsList from "../../components/SearchResult/SearchResult";
import { useNavigate, useParams } from "react-router-dom";
import { TimeList } from "../../data/search";
import { useSearch } from "../../hooks/useSearch";
import { useCountries } from "../../hooks/api/useCountries";
import { useCategories } from "../../hooks/api/useCategories";

/**
 * @since: Las variables que se encontraban acá, ahora forman parte de ../../data/search
 * las funciones que hacían consultas fueron trasladas a hooks/api, con el objetivo de que
 * se pueda buscar y usarse esos datos en cualquier parte.
 * @returns
 */

function SearchPage() {

  let { search } = useParams();
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const { getCountries, resultCountries: countries } = useCountries();
  const { getCategories, resultCategories: categories } = useCategories();
  const [activeCountries, setActiveCountries] = useState([]);
  const [activeDuration, setActiveDuration] = useState([]);
  const navigate = useNavigate();
  const { handleFilter, searchByAPI, searchResults } = useSearch();

  const handleCategoryClick = (value) => {
    handleFilter(value, activeCategories, setActiveCategories);
  };

  const handleCountryClick = (value) => {
    handleFilter(value, activeCountries, setActiveCountries);
  };

  const handleDurationClick = (value) => {
    handleFilter(value, activeDuration, setActiveDuration);
  };

  const redirRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const applyFilters = () => {
    if (
      activeCountries.length > 0 ||
      activeCategories.length > 0 ||
      activeDuration.length > 0
    ) {
      setFilteredResults(
        searchResults.filter(
          (receta) =>
            activeCountries.includes(
              receta.pais
            ) /*revisar tiempo y categoria*/ ||
            activeCategories.includes(receta.categoria)
        )
      );
    } else {
      setFilteredResults(searchResults);
    }
  };

  useEffect(() => {
    searchByAPI(search);
    setFilteredResults(searchResults);
    getCategories();
    getCountries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activeCategories, activeCountries, activeDuration]);

  useEffect(() => {
    setFilteredResults(searchResults);
  }, [searchResults]);

  useEffect(() => {
    searchByAPI(search);
  }, [search]);

  const filterCategoryBuilder = (options) => {
    return (
      <div className={styles.CountryOptions}>
        {options.map((x, i) => (
          <label key={i}>
            <input
              type="checkbox"
              name="lang"
              value={x.pais ? x.pais : x.value}
              onClick={() => {
                x.pais
                  ? handleCountryClick(x.pais)
                  : handleDurationClick(x.value);
              }}
            />{" "}
            {x.pais ? x.pais : x.label}
          </label>
        ))}
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className={styles.SearchPageContainer}>
        <div className={styles.FiltersContainer}>
          <h1>Filters</h1>
          <div className={styles.FiltersCountryContainer}>
            <div className={styles.FiltersCountryContainerInfo}>
              <TbMap2 fontSize={"1.5rem"} />
              <h2>Country</h2>
            </div>
            {countries ? filterCategoryBuilder(countries) : ""}
          </div>
          <div className={styles.FiltersCountryContainer}>
            <div className={styles.FiltersCountryContainerInfo}>
              <TbLayoutList fontSize={"1.5rem"} />
              <h2>Category</h2>
            </div>
            <div className={styles.CountryOptions}>
              {categories
                ? categories.map((x, i) => (
                    <label key={i}>
                      <button
                        className={
                          activeCategories.includes(x.categoria)
                            ? styles.activeButton
                            : ""
                        }
                        onClick={() => handleCategoryClick(x.categoria)}
                      >
                        {x.categoria}
                      </button>
                    </label>
                  ))
                : ""}
            </div>
          </div>
          <div className={styles.FiltersCountryContainer}>
            <div className={styles.FiltersCountryContainerInfo}>
              <TbAlarm fontSize={"1.5rem"} />
              <h2>Duration</h2>
            </div>
            {filterCategoryBuilder(TimeList)}
          </div>
        </div>

        <div className={styles.ResultsContainer}>
          <h1>
            We&apos;ve found {searchResults ? searchResults.length : "no"}{" "}
            results for &quot;{search}&quot;
          </h1>
          <div className={styles.ResultListContainer}>
            <SearchResultsList
              data={searchResults ? filteredResults : []}
              onClick={redirRecipe}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
