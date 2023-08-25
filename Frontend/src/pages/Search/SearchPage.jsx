import React, { useEffect } from "react";
import styles from './SearchPage.module.css';
import NavBar from "../../components/NavBar/NavBar";
import { TbMap2, TbLayoutList, TbAlarm} from "react-icons/tb";
import { useState } from "react";
import SearchResultsList from "../../components/SearchResult/SearchResult";
import { useParams, useNavigate } from "react-router-dom"
import { useAPI } from "../../hooks/useAPI";


// Backend logic
const CountryList = [
    {value: "Italia", label:"Italia"},
    {value: "Argentina", label:"Argentina"},
    {value: "Tailandia", label:"Tailandia"},
    {value: "Cuba", label:"Cuba"},
]

const CategoryList = [
    {value: "Postres", label:"Postres"},
    {value: "Ensaladas", label:"Ensaladas"},
    {value: "Bebidas", label:"Bebidas"},
    {value: "Aperitivos", label:"Aperitivos"},
]

// Esta es fija
const TimeList = [
    {value: "Short", label:"< 0-5min"},
    {value: "Medium", label:"5-30min"},
    {value: "Long", label:"> 1hrs"},
]


function SearchPage() {
    let { search } = useParams();
    const { fetchAPI } = useAPI();
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [activeCountries, setActiveCountries] = useState([]);
    const [activeDuration, setActiveDuration] = useState([]);

    //cosa fea horrible pero no tengo las ganas para unir las 3 funciones en una en este momento
    const handleCategoryClick = (value) => {
        if (activeCategories.includes(value)) {
            setActiveCategories(activeCategories.filter(category => category !== value));
        } else {
            setActiveCategories([...activeCategories, value]);
        }
    };

    const handleCountryClick = (value) => {
        if (activeCountries.includes(value)) {
            setActiveCountries(activeCountries.filter(country => country !== value));
        } else {
            setActiveCountries([...activeCountries, value]);
        }
    };

    const handleDurationClick = (value) => {
        if (activeDuration.includes(value)) {
            setActiveDuration(activeDuration.filter(duration => duration !== value));
        } else {
            setActiveDuration([...activeDuration, value]);
        }
    };

    const getSearchResults = async () => {
        try {
          const res = await fetchAPI({
            method: 'GET',
            route: `search?text=${search}`,
            body: null,
            log: false,
            showReply: true,
          });
          setSearchResults(res);
        } catch (error) {
          console.error("Error fetching recipes: ", error);
        }
    };

    const getCountries = async () => {
        try {
            const res = await fetchAPI({
                method: 'GET',
                route: `misc/countries`,
                body: null,
                log: false,
                showReply: true,
            });
            setCountries(res.data);
        } catch (error) {
            console.error("Error fetching countries: ", error)
        }
    };

    const getCategories = async () => {
        try {
            const res = await fetchAPI({
                method: 'GET',
                route: `misc/categories`,
                body: null,
                log: false,
                showReply: true,
            });
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching countries: ", error)
        }
    };

    const applyFilters = () => {
        if(activeCountries.length > 0 || activeCategories.length > 0 || activeDuration.length > 0){
            setFilteredResults(searchResults.filter((receta) => activeCountries.includes(receta.pais) /*revisar tiempo y categoria*/ || activeCategories.includes(receta.categoria)))
        } else {
            setFilteredResults(searchResults)
        }
    }

    useEffect(() => {
        getSearchResults();
        setFilteredResults(searchResults);
        getCategories();
        getCountries();
    }, [])

    useEffect(() => {
        applyFilters();
    }, [activeCategories, activeCountries, activeDuration])

    useEffect(() => {setFilteredResults(searchResults)}, [searchResults])
    useEffect(() => {getSearchResults();},[search]) 

    const filterCategoryBuilder = ( options ) => {
        return (
            <div className={styles.CountryOptions}>
                    {options.map((x,i) => <label key={i}>
                        <input
                        type="checkbox"
                        name="lang"
                        value={x.pais ? x.pais : x.value}
                        onClick={() => {x.pais ? handleCountryClick(x.pais) : handleDurationClick(x.value)}}
                        /> {x.pais ? x.pais : x.label}
                    </label>)}
            </div>
        )
    }

    return(
        <>
          <NavBar />
          <div className={styles.SearchPageContainer}>
            <div className={styles.FiltersContainer}>
                <h1>Filters</h1>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <TbMap2 fontSize={'1.5rem'} />
                        <h2>Country</h2>
                    </div>
                    {filterCategoryBuilder(countries)}
                </div>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <TbLayoutList fontSize={'1.5rem'} />
                        <h2>Category</h2>
                    </div>
                    <div className={styles.CountryOptions}>
                        {categories.map((x, i) => (
                            <label key={i}>
                                <button
                                    className={activeCategories.includes(x.categoria) ? styles.activeButton : ''}
                                    onClick={() => handleCategoryClick(x.categoria)}
                                >
                                    {x.categoria}
                                </button>
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <TbAlarm fontSize={'1.5rem'} />
                        <h2>Duration</h2>
                    </div>
                    {filterCategoryBuilder(TimeList)}
                </div>
            </div>

            <div className={styles.ResultsContainer}>
                <h1>We've found {searchResults ? searchResults.length : 'no'} results for "{search}"</h1>
                <div className={styles.ResultListContainer}>
                    <SearchResultsList data={searchResults ? filteredResults : []}/>
                </div>
            </div>
          </div>
        </>
    );
};

export default SearchPage;